const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Hàm tạo token
const genneralAccessToken = async (payload) => {
    const access_token = jwt.sign(
        {
            payload,
        },
        // secret key
        process.env.ACCESS_TOKEN,
        // token tồn tại trong 1h
        { expiresIn: "1h" }
    );
    return access_token;
};

// cấp lại access_token mới khi token hết hạn
const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign(
        {
            payload,
        },
        // secret key
        process.env.REFRESH_TOKEN,
        // token tồn tại trong 356 ngày
        { expiresIn: "365d" }
    );
    return refresh_token;
};

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
};
