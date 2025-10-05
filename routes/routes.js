const express = require("express");

// require the express router
const router = express.Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");

const { isAdmin, isAuthenticated } = require("../controllers/middlewares/auth");
// Auth
router.get("/", authController.showRegister);
router.get("/register", authController.showRegister);
router.post("/register", authController.register);

router.get("/login", authController.showLogin);
router.post("/login", authController.login);

// logout :      
router.get("/logout",isAuthenticated, authController.logout);


// set the routes
router.get("/home", userController.index);
router.get("/quiz", userController.quiz);
router.post("/quiz", userController.submitQuiz);

// admin routes
router.get("/admin-dashboard",isAdmin, adminController.index);
router.post("/addQuiz",isAdmin, adminController.AddQuiz);
// delete question :
router.get("/admin-dashboard/delete/:id",isAdmin, adminController.deleteQuestion);
// add quiz category:
router.post("/addCategory",isAdmin, adminController.addCategory);   
// edit quetion :
router.post("/editQuestion",isAdmin, adminController.EditQuestion);  
//export routes:
module.exports = router;

