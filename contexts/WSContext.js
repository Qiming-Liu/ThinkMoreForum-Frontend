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
  const [connected, setConnected] = useState(false);
  const { myDetail } = useSelector((state) => state.sign);
  const stompClient = useRef(null);
  const [updateInfo, setUpdateInfo] = useState(false);

  const onReminded = useCallback(async (reminder) => {
    console.log('On reminded', reminder);
    setTimeout(() => {
      setUpdateInfo((prev) => !prev);
    }, 1000);
  }, []);

  const onConnected = useCallback(() => {
    console.log(`Subscribing public channel...`);
    if (stompClient.current.connected) {
      stompClient.current.subscribe('/hall/greetings', (onlineUserList) => {
        console.log(`OnlineMsg: `, onlineUserList);
      });
      if (myDetail) {
        stompClient.current.send(
          '/app/hello',
          {},
          JSON.stringify({ userId: myDetail.id, status: 'online' }),
        );
        console.log(`Subscribing personal channel...`);
        stompClient.current.subscribe(
          `/user/${myDetail.id}/reminded`,
          onReminded,
        );
      }
    }
  }, [myDetail, onReminded]);

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

  const disconnect = useCallback(() => {
    stompClient.current.disconnect();
  }, [myDetail]);

  const connect = useCallback(() => {
    try {
      const Sock = new SockJS('https://api.thinkmoreapp.com/v1/public/ws');
      stompClient.current = over(Sock);
      stompClient.current.connect({}, onConnected, onError);
      setConnected(true);
    } catch (error) {
      setConnected(false);
    }
  }, [onConnected, onError]);

  useEffect(() => {
    connect();
  }, [connect, myDetail]);

  // console.log(`StompClient before render: `, stompClient);

  const values = useMemo(
    () => ({ handleRemind, updateInfo, disconnect }),
    [handleRemind, updateInfo, disconnect],
  );

  return <WSContext.Provider value={values}>{children}</WSContext.Provider>;
};

export const useWSContext = () => {
  return useContext(WSContext);
};
