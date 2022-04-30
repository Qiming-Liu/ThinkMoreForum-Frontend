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
import { debounce } from 'lodash';

const WSContext = createContext([]);

export const WSContextProvider = ({ children }) => {
  const { myDetail } = useSelector((state) => state.sign);
  const stompClient = useRef(null);
  const [updateInfo, setUpdateInfo] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const onReminded = useCallback(
    debounce(async () => {
      setUpdateInfo((prev) => !prev);
    }, 500),
    [],
  );

  const updateOnlineUsers = useCallback(
    debounce((rawOnlineUsers) => {
      const onlineUserList = JSON.parse(rawOnlineUsers.body);
      const formattedUserList = onlineUserList.map((user) =>
        user.substring(user.indexOf(':') + 1),
      );
      setOnlineUsers(formattedUserList);
    }, 500),
    [],
  );

  const onConnected = useCallback(() => {
    if (stompClient.current.connected) {
      stompClient.current.subscribe('/hall/greetings', (response) => {
        updateOnlineUsers(response);
      });
      if (myDetail) {
        stompClient.current.send(
          '/app/hello',
          {},
          JSON.stringify({ username: myDetail.username, status: 'online' }),
        );
        stompClient.current.subscribe(
          `/user/${myDetail.username}/reminded`,
          onReminded,
        );
      } else {
        stompClient.current.send(
          '/app/hello',
          {},
          JSON.stringify({ username: '', status: 'online' }),
        );
      }
    }
  }, [myDetail, onReminded, updateOnlineUsers]);

  const handleRemind = useCallback(
    (recipientName) => {
      stompClient.current.send(
        '/app/reminder',
        {},
        JSON.stringify({
          sender: myDetail.username,
          recipient: recipientName,
          content: 'please update notification',
        }),
      );
    },
    [myDetail],
  );

  const onError = useCallback(() => {
    console.log('Error happened when connecting ws');
  }, []);

  const disconnect = useCallback((myName) => {
    stompClient.current.disconnect();
    setOnlineUsers((prev) => {
      prev.filter((item) => item !== myName);
    });
  }, []);

  const connect = useCallback(() => {
    try {
      const Sock = new SockJS(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
      // const Sock = new SockJS('http://localhost:443/v1/public/ws');
      stompClient.current = over(Sock);
      stompClient.current.connect({}, onConnected, onError);
      stompClient.current.reconnect_delay = 5000;

      // Comment out this line to enable ws console log Cmessages
      stompClient.current.debug = null;
    } catch {}
  }, [onConnected, onError]);

  useEffect(() => {
    connect();
  }, [connect, myDetail]);

  const values = useMemo(
    () => ({ handleRemind, updateInfo, disconnect, onlineUsers }),
    [handleRemind, updateInfo, disconnect, onlineUsers],
  );

  return <WSContext.Provider value={values}>{children}</WSContext.Provider>;
};

export const useWSContext = () => {
  return useContext(WSContext);
};
