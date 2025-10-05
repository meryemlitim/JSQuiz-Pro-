const express = require("express");

// require the express router
const router = express.Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");


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

// admin routes
router.get("/admin-dashboard",adminController.index);
router.post("/addQuiz", adminController.AddQuiz);
// delete question :
router.get("/admin-dashboard/delete/:id", adminController.deleteQuestion);
// add quiz category:
router.post("/addCategory", adminController.addCategory);   
// edit quetion :
router.post("/editQuestion", adminController.EditQuestion);   
//export routes:
module.exports = router;

