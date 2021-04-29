const express = require("express");
const router = express.Router({ mergeParams: true });
const Course = require('../models/Course');

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

const { protect } = require('../middleware/auth');

const advancedResults = require('../middleware/advancedResults');

router.route("/").get(advancedResults(Course, {
  path: 'bootcamp',
  select: 'name description'
}), getCourses).post(protect, createCourse);

router.route("/:id").get(getCourse).put(protect, updateCourse).delete(protect, deleteCourse);

module.exports = router;
