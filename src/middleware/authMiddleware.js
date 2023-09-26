const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// check quyền admin
const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(" ")[1]; // split lấy mảng thứ 1
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: "The authentication",
                status: "ERROR",
            });
        }
        // nếu có user thì lấy payload trong user
        const { payload } = user;
        // check payload nếu admin = true
        if (payload?.isAdmin) {
            // nếu isAdmin = true thì đi tiếp
            next();
        } else {
            return res.status(404).json({
                message: "The authentication",
                status: "ERROR",
            });
        }
    });
};

module.exports = {
    authMiddleware,
};
