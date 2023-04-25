const express = require("express");
const { testProdcut } = require("../controllers/productController");
const router = express.Router();

router.post("/testProduct", testProdcut);

module.exports = router;
