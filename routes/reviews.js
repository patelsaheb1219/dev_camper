const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/Review");

const {
  getReviews,
  getReview
} = require("../controllers/reviews");

const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getReviews
  );

  router
  .route('/:id')
  .get(
    getReview
  );

module.exports = router;