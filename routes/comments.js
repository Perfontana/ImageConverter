const express = require('express');
const { getComments, addComment } = require('../controllers/comments');

const router = express.Router();

router.route('/').get(getComments);
router.route('/').post(addComment);

module.exports = router;
