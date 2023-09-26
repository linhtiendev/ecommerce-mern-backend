// Hàm xử lí liên quan đến API

const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

// Hàm check tạo user
const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = newUser;
        try {
            // Hàm check email đã tồn tại
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser !== null) {
                resolve({
                    status: "OK",
                    message: "Email is already",
                });
            }
            // hàm hashpassword (mã hóa)
            const hash = bcrypt.hashSync(password, 10);
            // Hàm tạo user
            const createUser = await User.create({
                name,
                email,
                password: hash,
                phone,
            });
            if (createUser) {
                resolve({
                    status: "OK",
                    message: "User created!",
                    data: createUser,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

// Hàm check login user
const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            // Hàm check user tồn tại
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "User is not defined",
                });
            }
            // Hàm check (so sánh password input vs password in db)
            const comparePassword = bcrypt.compareSync(
                password,
                checkUser.password
            );
            if (!comparePassword) {
                resolve({
                    status: "OK",
                    message: "Password or user is incorrect",
                });
            }
            // sau khi login thành công
            // cấp access token khi đăng nhập
            // truyền payload
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });
            // cấp lại access_token mới khi access_token hết hạn
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });
            // k có case lỗi sẽ trả ra user vừa login
            resolve({
                status: "OK",
                message: "SUCCESS",
                // data: checkUser, // trả về access_token thay vì user để bảo mật
                access_token,
                refresh_token,
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Hàm check update user
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            });
            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "User is not defined",
                });
            }
            // Hàm update user
            const updatedUser = await User.findByIdAndUpdate(id, data, {
                // khởi tạo dl mới khi cập nhật thành công
                new: true,
            });
            resolve({
                status: "OK",
                message: "Update user success",
                data: updatedUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Hàm check delete user
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            });
            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "User is not defined",
                });
            }
            // Hàm delete user
            await User.findByIdAndDelete(id);
            resolve({
                status: "OK",
                message: "Delete user success",
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Hàm check get all user
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // Hàm get all user
            const getAllUsers = await User.find();
            resolve({
                status: "OK",
                message: "Get all user success",
                data: getAllUsers,
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Hàm check get detail user
const getDetailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id,
            });
            if (user === null) {
                resolve({
                    status: "OK",
                    message: "User is not defined",
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: user,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
};
