const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// gọi đến controller
// method tạo
router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);

module.exports = router;
