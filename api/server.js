const express = require('express');

const server = express();

const usersRouter = require('./users/users-router.js');
const { logger } = require('./middleware/middleware');
server.use(express.json());
server.use(logger);
server.use('/api/users', usersRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
