// @desc    get all bootcamps
// @routes    GET /api/v1/bootcamps
// @access    Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, message: `Show All Bootcamps` });
};

// @desc    get one bootcamp by ID
// @routes    GET /api/v1/bootcamp/:id
// @access    Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Get Bootcamp ${req.params.id}` });
};

// @desc    Add New bootcamp
// @routes    POST /api/v1/bootcamps
// @access    Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, message: `Create a new bootcamp` });
};

// @desc    Update bootcamp by ID
// @routes    PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Update Bootcamp ${req.params.id}` });
};

// @desc    Delete bootcamp by ID
// @routes    DELETE /api/v1/bootcamps/:id
// @access    Public
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Delete Bootcamp ${req.params.id}` });
};
