const express = require("express");
const router = express.Router();
const { testProduct , addProduct, getAllProduct} = require("../controllers/productController");
const { isLoggedIn, customRole } = require("../middlewares/user");


router.get("/testProduct", testProduct);
router.get("/products", getAllProduct);

//adming add product route
router.post("/admin/product/add", isLoggedIn, customRole('admin'), addProduct);


module.exports = router;
