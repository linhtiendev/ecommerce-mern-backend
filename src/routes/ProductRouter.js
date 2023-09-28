const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.post("/create", ProductController.createProduct);

module.exports = router;
