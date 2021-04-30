const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamp");
const Review = require("../models/Review");

// @desc    Get Reviews
// @routes    GET /api/v1/reviews
// @routes    GET /api/v1/bootcamps/:bootcampId/reviews
// @access    Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    })
  } else {
    res.status(200).json(res.advancedResults) 
  }
});

// @desc    Get Review
// @routes    GET /api/v1/reviews/:id
// @access    Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  });

  if (!review) {
    return next(new ErrorResponse(`No review found with Id of ${req.params.id}`, 400))
  }

  res.status(200).json({
    success: true,
    data: review
  })
});

// @desc    Add Review
// @routes    POST /api/v1/bootcamps/:bootcampId/reviews
// @access    Private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(new ErrorResponse(`No bootcamp found with Id of ${req.params.bootcampId}`, 404))
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review
  })
});