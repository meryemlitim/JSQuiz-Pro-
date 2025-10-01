const express = require("express");

// require the express router
const router = express.Router();
const userController = require("../controllers/userController");

// set the routes
router.get("/", userController.index);
router.get("/quiz", userController.quiz);
router.post("/quiz", userController.submitQuiz);



//export routes
module.exports = router;

