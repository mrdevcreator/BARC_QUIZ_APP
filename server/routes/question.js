const express = require("express");
const router = express.Router();
const { getQuestions } = require("../controllers/questionController");
const requireSignIn = require("../middlewares/authMiddleware");

router.get("/", requireSignIn, getQuestions);

module.exports = router;
