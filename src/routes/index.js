const UserRouter = require("./UserRouter");

// chứa router của tất cả API
const routes = (app) => {
    // gọi đến UserRouter
    app.use("/api/user", UserRouter);
};
module.exports = routes;
