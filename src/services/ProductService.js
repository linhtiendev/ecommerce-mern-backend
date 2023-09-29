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

// Hàm check delete product
const deleteProduct = (id) => {
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
            // Hàm delete product
            await Product.findByIdAndDelete(id);
            resolve({
                status: "OK",
                message: "Delete product success",
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Hàm check get detail product
const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id,
            });
            if (product === null) {
                resolve({
                    status: "OK",
                    message: "Product is not defined",
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: product,
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Hàm check get all product
const getAllProduct = (limit, page, sort) => {
    return new Promise(async (resolve, reject) => {
        try {
            // hàm đếm số lượng product hiển thị
            const totalProduct = await Product.count();
            // điều kiện để sort product
            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const allProductSort = await Product.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);
                resolve({
                    status: "OK",
                    message: "Get all product success",
                    data: allProductSort,
                    totalProduct: totalProduct,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalProduct / limit),
                });
            }
            // Hàm get all product
            const getAllProducts = await Product.find()
                .limit(limit) // số lượng object <=> số lượng sản phẩm
                .skip(page * limit) // Bỏ qua số lượng object để lấy object tiếp theo
                .sort({
                    name: sort,
                });
            resolve({
                status: "OK",
                message: "Get all product success",
                data: getAllProducts,
                totalProduct: totalProduct, // hiển thị số lượng object (product) ở page
                pageCurrent: page + 1, // hiển thị số page
                totalPage: Math.ceil(totalProduct / limit), // hiển thị tổng số page
                // ceil() làm tròn một số đến số nguyên lớn nhất tiếp theo. vd: 7.005 => 8
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getDetailProduct,
    getAllProduct,
};
