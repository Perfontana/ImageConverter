const express = require('express');
const { processFile } = require('../controllers/audio');

const router = express.Router();

router.route('/process').post(processFile);

module.exports = router;
