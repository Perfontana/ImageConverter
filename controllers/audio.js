// const asyncHandler = require('../utils/asyncHandler')
const { exec } = require('child_process');
const { getUploadDirectory } = require('../config/uploadSettings');
const ErrorResponse = require('../utils/errorResponse');
// @desc      Process audip file
// @route     POST /api/v1/audio/process
// @access    Public
module.exports.processFile = (req, res, next) => {
  req.body.inputFile = req.files.audioFile.tempFilePath;
  req.body.outputFile = outputFile(req.body);
  const command = constructCommand(req.body);
  exec(command, (err, stdout, stderr) => {
    if (err) {
      timerDelete(req.body.inputFile, 15000);
      return next(new ErrorResponse(err, 500));
    }

    timerDelete(req.body.inputFile, 15000);
    timerDelete(req.body.outputFile, 120000);

    res.status(200).json({
      success: true,
      data: getFileLink(req.body.outputFile),
    });
  });
};

function getFileLink(path) {
  return '/uploads/' + path.split('/').pop();
}

// Need to change exec to nodeJS fylesystem.unlink later
function timerDelete(filePath, miliseconds) {
  setTimeout(() => {
    exec('rm ' + filePath);
  }, miliseconds);
}

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

function outputFile(options) {
  const inputFile = options.inputFile.split('/');
  const outputFile =
    getUploadDirectory() + inputFile.pop() + '.' + options.type;
  return outputFile;
}
