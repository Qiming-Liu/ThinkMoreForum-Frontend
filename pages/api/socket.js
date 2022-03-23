import { Server } from 'socket.io';

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    io.on('connection', (socket) => {
      console.log(`Socket server:`, `someone connected`);
      socket.on('input-change', ({ content }) => {
        console.log(`server detected input change`, content);
        io.emit(`input-change-Server`, { content: 'hhhh' });
      });
      socket.on('remind', ({ recipient }) => {
        console.log(
          `Server is asked to remind user ${recipient} updating notifications`,
        );
        io.emit('remind-Server', { recipient });
      });
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
