const express = require('express');
const {
  getComments,
  addComment,
  deleteComments,
} = require('../controllers/comments');

const router = express.Router();

router.route('/').get(getComments).post(addComment).delete(deleteComments);

module.exports = router;
