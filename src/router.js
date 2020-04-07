const express = require('express');

const db = require('../data/db');

const router = express.Router();

/**
 * if missing `title` or `contents`:
 *    cancel request
 *    status 400
 *    return { errorMessage: 'Please provide title and contents for the post.' }
 * 
 * if valid:
 *    save new `post` data
 *    status 201
 *    return new `post`
 * 
 * if error while saving:
 *    cancel request
 *    status 500
 *    return { error: 'There was an error while saving the post to the database.' }
 */
router.post('/', (req, res) => {
  const postData = req.body;
  if (!postData.title || !postData.contents) {
    res.status(400).json({ 'errorMessage': 'Please provide title and contents for the post.' });
  }
  db.insert(postData)
    .then(id => {
      db.findById(id.id)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(() => {
          res.status(500).json({ 'error': 'There was an error reading the new post.' });
        });
    })
    .catch(() => {
      res.status(500).json({ 'error': 'There was an error while saving the post to the database.' });
    });
});

/**
 * if id is not found:
 *    status 404
 *    return { message: 'The post with the specified ID does not exist.' }
 * 
 * if missing `text`:
 *    cancel request
 *    status 400
 *    return { errorMessage: 'Please provide text for the comment.' }
 * 
 * if valid:
 *    save new `comment`
 *    status 201
 *    return new `comment`
 * 
 * if error while saving:
 *    cancel request
 *    status 500
 *    return { error: 'There was an error while saving the comment to the database.' }
 */
router.post('/:id/comments', (req, res) => {
  const commentData = req.body;
  if (!commentData.text) {
    res.status(400).json({ 'errorMessage': 'Please provide text for the comment.' });
  }
  db.findById(req.params.id)
    .then(() => {
      db.insertComment(commentData)
        .then(commentId => {
          db.findCommentById(commentId.id)
            .then(comment => {
              res.status(201).json(comment);
            })
            .catch(() => {
              res.status(500).json({ 'error': 'There was an error reading the new comment.' });
            });
        })
        .catch(() => {
          res.status(500).json({ 'error': 'There was an error while saving the comment to the database.' });
        });
    })
    .catch(() => {
      res.status(404).json({ 'message': 'The post with the specified ID does not exist.' });
    });
});

/**
 * if error retrieving `posts` from database:
 *    cancel request
 *    status 500
 *    return { error: 'The posts information could not be retrieved.' }
 */
router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ 'error': 'The posts information could not be retrieved.' });
    });
});

/**
 * if id is not found: 
 *    status 404
 *    return { message: 'The post with the specified ID does not exist.' }
 * 
 * if error retrieving `post` from database:
 *    cancel request
 *    status 500
 *    return { error: 'The post information could not be retrieved.' }
 */
router.get('/:id', (req, res) => {
  try {
    db.findById(req.params.id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(() => {
        res.status(404).json({ 'message': 'The post with the specified ID does not exist.' });
      });
  } catch {
    res.status(500).json({ 'error': 'The post information could not be retrieved.' });
  }
});

/**
 * if id is not found:
 *    status 404
 *    return { message: 'The post with the specified ID does not exist.' }
 * 
 * if error retrieving `comments` from database:
 *    cancel request
 *    status 500
 *    return { error: 'The comments information could not be retrieved.' }
 */
router.get('/:id/comments', (req, res) => {
  try {
    db.findPostComments(req.params.id)
      .then(comments => {
        res.status(200).json(comments);
      })
      .catch(() => {
        res.status(404).json({ 'message': 'The post with the specified ID does not exist.' });
      });
  } catch {
    res.status(500).json({ 'error': 'The comments information could not be retrieved.' });
  }
});

/**
 * if id is not found:
 *    status 404
 *    return { message: 'The post with the specified ID does not exist.' }
 * 
 * if error removing `post` from database:
 *    cancel request
 *    status 500
 *    return { error: 'The post could not be removed.' }
 */
router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
      .then(count => {
        if (count) {
          res.status(200).json({ 'message': 'Post deleted.' });
        } else {
          res.status(404).json({ 'message': 'The post with the specified ID does not exist.' });
        }
      })
      .catch(() => {
        res.status(500).json({ 'error': 'The post could not be removed.' });
      });
});

/**
 * if id is not found:
 *    status 404
 *    return { message: 'The post with the specified ID does not exist.' }
 * 
 * if missing `body` or `contents`:
 *    cancel request
 *    status 400
 *    return { errorMessage: 'Please provide title and contents for the post.' }
 * 
 * if error updating `post`
 *    cancel request
 *    status 500
 *    return { error: 'The post information could not be modified.' }
 * 
 * if valid:
 *    update post
 *    status 200
 *    return new `post`
 */
router.put('/:id', (req, res) => {
  const newPost = req.body;

  db.update(req.params.id, newPost)
    .then(count => {
      if (count) {
        db.findById(req.params.id)
          .then(post => {
            res.status(200).json(post);
          })
          .catch(() => {
            res.status(500).json({ 'error': 'There was a problem reading the updated post' });
          })
      } else {
        res.status(404).json({ 'message': 'The post with the specified ID does not exist.' });
      }
    })
    .catch(() => {
      res.status(500).json({ 'error': 'The post information could not be modified.' });
    });
});

module.exports = router;
