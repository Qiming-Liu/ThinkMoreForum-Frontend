import React, { useState } from 'react';
import { useSocketContext } from '../contexts/SocketContext';

const WhatIsThis = () => {
  const { socket } = useSocketContext();
  console.log(`inWhatIsThis`, socket);
  const [input, setInput] = useState('');

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    socket.emit('input-change', { content: e.target.value });
  };

  return (
    <input
      placeholder="Type something"
      value={input}
      onChange={onChangeHandler}
    />
  );
};

export default WhatIsThis;
