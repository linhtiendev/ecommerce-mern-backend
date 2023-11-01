const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Hàm tạo token
const genneralAccessToken = async (payload) => {
    const access_token = jwt.sign(
        {
            ...payload,
        },
        // secret key
        process.env.ACCESS_TOKEN,
        // token tồn tại trong 30s
        { expiresIn: "30s" }
    );
    return access_token;
};

// cấp lại access_token mới khi token hết hạn
const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign(
        {
            ...payload,
        },
        // secret key
        process.env.REFRESH_TOKEN,
        // token tồn tại trong 356 ngày
        { expiresIn: "365d" }
    );
    return refresh_token;
};

// Hàm cấp lại token mới khi token hết hạn
const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: "ERR",
                        message: "The Authentication",
                    });
                }
                // hàm lấy thông tin user từ payload
                const { payload } = user;
                const access_token = await genneralAccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin,
                });
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    access_token,
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService,
};
