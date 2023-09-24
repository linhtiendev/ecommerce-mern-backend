const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

// Hàm xử lí liên quan đến API
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
module.exports = {
    createUser,
};
