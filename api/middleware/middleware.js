const { getById } = require('./../users/users-model');

function logger(req, res, next) {
  console.log(`${req.method} ${req.url} [${new Date().toISOString()}]`);
  next()
}

function validateUserId(req, res, next) {
  getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        next({
          status: 404,
          message: 'user not found'
        })
      }
    })
    .catch(next)
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};