const express = require("express");

// require the express router
const router = express.Router();
const controller = require("../controllers/controller");

// set the routes
router.get("/", controller.index);


//export routes
module.exports = router;

