// const asyncHandler = require('../utils/asyncHandler')
const { exec } = require('child_process');
const { getUploadDirectory } = require('../config/uploadSettings');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Process audip file
// @route     POST /api/v1/audio/process
// @access    Public
module.exports.processFile = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorResponse('Please upload file to convert.', 400));
  }

  if (!req.body.type) {
    return next(new ErrorResponse('Type paramether is missing.', 400));
  }

  const options = getCommandOptions(req);

  exec(constructCommand(options), (err, stdout, stderr) => {
    if (err) {
      return next(new ErrorResponse(err, 400));
    }

    if (stderr) {
      return next(new ErrorResponse(stderr, 400));
    }

    res.status(200).json({
      success: true,
      data: getFileLink(options.outputFile),
    });
  });
};

function constructCommand(options) {
  return (
    'sox ' +
    options.inputFile +
    ' -t ' +
    options.type +
    ' ' +
    options.outputFile
  );
}

function getFileName(filePath) {
  return filePath.split('/').pop();
}

function getCommandOptions(req) {
  const options = {};
  options.type = req.body.type;
  options.inputFile = req.files.audioFile.tempFilePath;
  options.outputFile =
    getUploadDirectory() + getFileName(options.inputFile) + '.' + options.type;
  return options;
}

function getFileLink(filePath) {
  const path = filePath.split('/');
  return '/' + path[path.length - 2] + '/' + path[path.length - 1];
}
