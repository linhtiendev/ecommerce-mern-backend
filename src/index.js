const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// dùng để giải quyết lỗi khi call api
app.use(cors());

// dùng để nhận resquest từ client gửi lên
app.use(bodyParser.json());

// dùng để lấy cookie phía client
app.use(cookieParser());

// routes truyền app vào
routes(app);

// connect to MongoDB
mongoose
    .connect(`${process.env.MONGO_DB}`)
    // promise
    .then(() => {
        console.log("Connect DB success!");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log("Server is running in port: ", port);
});
