const jwt = require("jsonwebtoken");

// Hàm tạo token
const genneralAccessToken = async (payload) => {
    const access_token = jwt.sign(
        {
            payload,
        },
        // secret key
        "access_token",
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
        "refresh_token",
        // token tồn tại trong 356 ngày
        { expiresIn: "365d" }
    );
    return refresh_token;
};

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
};
