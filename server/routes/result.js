const express = require("express");
const router = express.Router();
const { getResults } = require("../controllers/resultController");
const requireSignIn = require("../middlewares/authMiddleware");

router.post("/submit", 
  requireSignIn,
  getResults
);


module.exports = router;
