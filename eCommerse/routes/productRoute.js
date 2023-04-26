const express = require("express");
const router = express.Router();
const { testProdcut } = require("../controllers/productController");

router.post("/testProduct", testProdcut);

module.exports = router;
