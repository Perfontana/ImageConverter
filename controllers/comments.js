const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const { getComments, addComment } = require('../database/comments');

// @desc      Get all comments
// @route     GET /api/v1/comments
// @access    Public
module.exports.getComments = asyncHandler(async (req, res, next) => {
  const data = await getComments();

  res.status(200).json({
    success: true,
    data,
  });
});

// @desc      Add new comment
// @route     POST /api/v1/comments
// @access    Public
module.exports.addComment = asyncHandler(async (req, res, next) => {
  if (!req.body.name) {
    return next(new ErrorResponse('Name paramether is missing', 400));
  }

  if (!req.body.text) {
    return next(new ErrorResponse('Text paramether is missing', 400));
  }

  await addComment(req.body.name, req.body.text);

  res.status(201).json({
    success: true,
  });
});
