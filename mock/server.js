const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);
server.listen(5566, () => {
  // eslint-disable-next-line no-console
  console.log('JSON Server is running at port http://localhost:5566');
});
