const UserService = require("../services/UserService");

// hàm xử lý method tạo
const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body;
        // check có phải là email hay không
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email); // boolean
        // check input
        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(200).json({
                status: "error",
                message: "Input is required",
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: "error",
                message: "Input is email",
            });
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: "error",
                message: "Input is equal confirmPassword",
            });
        }
        // nếu k rơi vào case lỗi thì sẽ gọi đến service
        const response = await UserService.createUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

// Hàm đăng nhập
const loginUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body;
        // check có phải là email hay không
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email); // boolean
        // check input
        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(200).json({
                status: "error",
                message: "Input is required",
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: "error",
                message: "Input is email",
            });
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: "error",
                message: "Input is equal confirmPassword",
            });
        }
        // nếu k rơi vào case lỗi thì sẽ gọi đến service
        const response = await UserService.loginUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

// Hàm xử lý trước khi cập nhật user
const updateUser = async (req, res) => {
    try {
        // hàm lấy id từ req
        const userId = req.params.id;
        // hàm nhận dl từ req
        const data = req.body;
        if (!userId) {
            return res.status(200).json({
                status: "error",
                message: "User id is required",
            });
        }
        const response = await UserService.updateUser(userId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

// Hàm xử lý trước khi xóa user
const deleteUser = async (req, res) => {
    try {
        // hàm lấy id từ req
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: "error",
                message: "User id is required",
            });
        }
        const response = await UserService.deleteUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

// Hàm xử lý trước khi lấy tất cả user
const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

// Hàm xử lý trước khi lấy thông tin user
const getDetailUser = async (req, res) => {
    try {
        // hàm lấy id từ req
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: "error",
                message: "User id is required",
            });
        }
        const response = await UserService.getDetailUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
};
