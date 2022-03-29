import React, {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

const WSContext = createContext([]);

export const WSContextProvider = ({ children }) => {
  const { isLogin, myDetail } = useSelector((state) => state.sign);
  const stompClient = useRef(null);
  const [updateInfo, setUpdateInfo] = useState(false);

  const onReminded = useCallback(async (reminder) => {
    console.log('On reminded', reminder);
    setTimeout(() => {
      setUpdateInfo((prev) => !prev);
    }, 1000);
  }, []);

  const onConnected = useCallback(() => {
    console.log('Connected');
    console.log(`Subscribing public channel...`);
    console.log(`StompClient in onConnected: `, stompClient);
    if (stompClient.current.connected) {
      stompClient.current.subscribe('/hall/greetings', (greeting) => {
        console.log(`Greeting message: `, greeting);
      });
      stompClient.current.send(
        '/app/hello',
        {},
        JSON.stringify({ userId: myDetail.id, online: true }),
      );
      if (isLogin && myDetail) {
        console.log(`Subscribing personal channel...`);
        console.log(`myDetail in onConnected: `, myDetail);
        stompClient.current.subscribe(
          `/user/${myDetail.id}/reminded`,
          onReminded,
        );
      }
    }
  }, [isLogin, myDetail, onReminded]);

  const handleRemind = useCallback(
    (recipientId) => {
      console.log(`Sending reminder to: `, recipientId);
      stompClient.current.send(
        '/app/reminder',
        {},
        JSON.stringify({
          sender: myDetail.id,
          recipient: recipientId,
          content: 'please update notification',
        }),
      );
    },
    [myDetail],
  );

  const onError = useCallback(() => {
    console.log('Error happened when connecting ws');
  }, []);

  const connect = useCallback(() => {
    const Sock = new SockJS('http://localhost:443/v1/public/ws');
    stompClient.current = over(Sock);
    stompClient.current.connect({}, onConnected, onError);
  }, [onConnected, onError]);

  useEffect(() => {
    connect();
  }, [connect, myDetail]);

  // console.log(`StompClient before render: `, stompClient);

  const values = useMemo(
    () => ({ handleRemind, updateInfo }),
    [handleRemind, updateInfo],
  );

  return <WSContext.Provider value={values}>{children}</WSContext.Provider>;
};

export const useWSContext = () => {
  return useContext(WSContext);
};
