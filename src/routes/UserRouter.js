const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// gọi đến controller
// method tạo
router.post("/", userController.createUser);

module.exports = router;
