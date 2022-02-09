const express = require('express');

const {
  validateUserId,
  validateUser,
  validatePost
} = require('./../middleware/middleware');

const Users = require('./users-model');
const Posts = require('./../posts/posts-model');


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

router.delete('/:id', validateUserId, async (req, res, next) => {
  try {
    const user = await Users.getById(req.params.id)
    await Users.remove(req.params.id)
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(next);
});

router.post(
  '/:id/posts', 
  validateUserId, 
  validatePost, 
  (req, res, next) => {
    const postInfo = {...req.body, user_id: req.params.id };

    Posts.insert(postInfo)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(next);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: 'something went wrong in the users router',
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;