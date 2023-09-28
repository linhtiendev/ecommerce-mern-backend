const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");

// chứa router của tất cả API
const routes = (app) => {
    // gọi đến UserRouter
    app.use("/api/user", UserRouter);
    // Gọi đến ProductRouter
    app.use("/api/product", ProductRouter);
};
module.exports = routes;
