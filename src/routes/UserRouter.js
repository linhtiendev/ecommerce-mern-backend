const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// gọi đến controller
router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.put("/update-user/:id", userController.updateUser);

module.exports = router;
