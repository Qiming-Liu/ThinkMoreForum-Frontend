/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { isLogin } = useSelector((state) => state.sign);
  const [socket, setSocket] = useState();

  const socketInitializer = useCallback(async () => {
    await fetch('/api/socket');
    setSocket(io());
    console.log(`contextInit`, socket);
    if (socket) {
      socket.on('connect', () => {
        console.log('connected');
      });
    }
  }, [socket]);

  const sendReminder = useCallback(
    (recipientId) => {
      console.log(`reminding ${recipientId}`);
      socket.emit('remind', { recipient: recipientId });
    },
    [socket],
  );

  useEffect(() => {
    if (isLogin) socketInitializer();
    else if (socket) socket.disconnect();
  }, [isLogin]);

  console.log(`inContext`, socket);

  const values = useMemo(
    () => ({ socket, socketInitializer, sendReminder }),
    [socket],
  );
  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return useContext(SocketContext);
};
