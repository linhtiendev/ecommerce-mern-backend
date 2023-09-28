// Hàm xử lí liên quan đến API
const Product = require("../models/ProductModel");

// Hàm check tạo product
const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description } =
            newProduct;
        try {
            // Hàm check name product đã tồn tại
            const checkProduct = await Product.findOne({
                name: name,
            });
            if (checkProduct !== null) {
                resolve({
                    status: "OK",
                    message: "Name of product is already",
                });
            }
            // Hàm tạo product
            const createdProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                description,
            });
            if (createdProduct) {
                resolve({
                    status: "SUCCESS",
                    message: "Product created!",
                    data: createdProduct,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

// Hàm check update product
const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            });
            if (checkProduct === null) {
                resolve({
                    status: "OK",
                    message: "Product is not defined",
                });
            }
            // Hàm update product
            const updatedProduct = await Product.findByIdAndUpdate(id, data, {
                // khởi tạo dl mới khi cập nhật thành công
                new: true,
            });
            resolve({
                status: "OK",
                message: "Update product success",
                data: updatedProduct,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createProduct,
    updateProduct,
};
