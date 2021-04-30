const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

// @desc    Get all Users
// @routes    Get /api/v1/users
// @access    Private/admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single User
// @routes    Get /api/v1/users/:id
// @access    Private/admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user  = await User.findById(req.params.id);
  
  if (!user) {
    return next(new ErrorResponse(`User with this id "${req.params.id}" not found`, 404))
  }
  res.status(200).json({ success: true, data: user});
});

// @desc    Create User
// @routes    POST /api/v1/users
// @access    Private/admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user  = await User.create(req.body);

  res.status(201).json({ success: true, data: user});
});

// @desc    Update User
// @routes    PUT /api/v1/users/:id
// @access    Private/admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  
  if (!user) {
    return next(new ErrorResponse(`User with this id "${req.params.id}" not found`, 404))
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({ success: true, data: user});
});

// @desc    Delete User
// @routes    DELETE /api/v1/users/:id
// @access    Private/admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  
  if (!user) {
    return next(new ErrorResponse(`User with this id "${req.params.id}" not found`, 404))
  }

  await User.findByIdAndDelete(req.params.id)

  res.status(200).json({ success: true, data: {}});
});