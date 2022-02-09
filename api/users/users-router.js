const express = require('express');

const {
  validateUserId,
  validateUser,
  validatePost
} = require('./../middleware/middleware');

const Users = require('./users-model');
// const Posts = require('./../posts/posts-model');


const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user);
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then(user => {
      console.log(user);
      res.json(user)
    })
    .catch(next);
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: 'something went wrong in the users router',
    message: err.message,
    stack: err.stack
  });
});

// do not forget to export the router
module.exports = router;