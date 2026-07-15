const express = require("express");
const router = express.Router();

const aiController = require("../controllers/ai.controller");

router.get("/test", (req, res) => {
  res.send("AI route working");
});

// GENERATE ONLY
router.post(
  "/generate-food-ai",
  aiController.generateFoodAI
);

// GENERATE + SAVE
router.post(
  "/generate-food-ai/:foodId",
  (req, res, next) => {
    console.log("FOOD ID:", req.params.foodId);
    next();
  },
  aiController.generateAndSaveFoodAI
);

// ANALYZE RESTAURANT REVIEWS
router.put(
  "/admin/restaurants/:id/analyze",
  aiController.analyzeRestaurantReviews
);

// ADD REVIEW
router.put(
  "/stores/:id/review",
  aiController.addReview
);

module.exports = router;