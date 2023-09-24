const UserService = require("../services/UserService");

// xử lý method tạo
const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const res = await UserService.createUser();
        return res.status(200).json(res);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};
module.exports = {
    createUser,
};
