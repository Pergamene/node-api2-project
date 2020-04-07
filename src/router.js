const express = require('express');

const db = require('../data/db');

const router = express.Router();

/**
 * if missing `title` or `contents`:
 *    cancel request
 *    status 400
 *    return { errorMessage: 'Please provide title and contests for the post.' }
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

});

/**
 * if error retrieving `posts` from database:
 *    cancel request
 *    status 500
 *    return { error: 'The posts information could not be retrieved.' }
 */
router.get('/', (req, res) => {

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
 * if valid:
 *    update post
 *    status 200
 *    return new `post`
 */
router.put('/:id', (req, res) => {

});

module.exports = router;
