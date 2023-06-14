import express from 'express';

const server = express();

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(3000, () => {
  global.console.log('Server listening on port 3000');
});
