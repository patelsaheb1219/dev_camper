const express = require("express");
const router = express.Router();
const Bootcamp = require("../models/Bootcamp");

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const advancedResults = require("../middleware/advancedResults");

const { protect, authorize } = require('../middleware/auth');

// Include other resource routers
const courseRouter = require("./courses");

// Re-route into other resourse router
router.use("/:bootcampId/courses", courseRouter);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router.route("/:id/photo").put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

module.exports = router;
