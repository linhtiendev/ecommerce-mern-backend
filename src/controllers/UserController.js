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
module.exports = {
    createUser,
};
