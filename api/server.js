const express = require('express');

const server = express();

const usersRouter = require('./users/users-router.js');
// const logger = require('./middleware/middleware');
server.use(express.json());
server.use('/api/users', usersRouter);
// server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// server.use('*', (req, res) => {
//   res.status(404).json({
//     message: `${req.meth} ${req.baseUrl} not found`
//   });
// });

module.exports = server;
