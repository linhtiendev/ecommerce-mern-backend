// Hàm xử lí liên quan đến API
const Product = require("../models/ProductModel");

// Hàm check tạo user
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

module.exports = {
    createProduct,
};
