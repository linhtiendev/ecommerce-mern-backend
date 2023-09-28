const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
    authMiddleware,
    authUserMiddleware,
} = require("../middleware/authMiddleware");

// gọi đến controller
router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", authMiddleware, userController.deleteUser); // đi đến middleware trước để check quyền
router.get("/getAllUser", authMiddleware, userController.getAllUser);
router.get(
    "/get-detail-user/:id",
    authUserMiddleware,
    userController.getDetailUser
);
// tạo access_token mới khi access_token hết hạn
router.post("/refresh-token", userController.refreshToken);

module.exports = router;
