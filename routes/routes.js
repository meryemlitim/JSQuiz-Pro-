const express = require("express");

// require the express router
const router = express.Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");


// Auth
router.get("/", authController.showRegister);
router.get("/register", authController.showRegister);
router.post("/register", authController.register);

router.get("/login", authController.showLogin);
router.post("/login", authController.login);

router.get("/logout", authController.logout);


// set the routes
router.get("/home", userController.index);
router.get("/quiz", userController.quiz);
router.post("/quiz", userController.submitQuiz);



//export routes
module.exports = router;

