const express = require("express");
const router = express.Router();
const {
  testProduct,
  addProduct,
  getAllProduct,
  adminGetAllProduct,
  adminUpdateOneProduct,
  adminDeleteOneProduct,
  getOneProduct,
  addReview,
  deleteReview,
  getOnlyReviewsForOneProduct
} = require("../controllers/productController");
const { isLoggedIn, customRole } = require("../middlewares/user");

router.get("/testProduct", testProduct);
router.get("/products", getAllProduct);
router.get("/product:id", getOneProduct);
router.put("/review", isLoggedIn, addReview);
router.delete("/review", isLoggedIn, deleteReview);
router.get("/reviews", isLoggedIn, getOnlyReviewsForOneProduct);


//adming add product route
router.post("/admin/product/add", isLoggedIn, customRole("admin"), addProduct);
router.get(
  "/admin/product/get",
  isLoggedIn,
  customRole("admin"),
  adminGetAllProduct
);
router.put(
  "/admin/product/update",
  isLoggedIn,
  customRole("admin"),
  adminUpdateOneProduct
);
router.delete(
  "/admin/product/delete",
  isLoggedIn,
  customRole("admin"),
  adminDeleteOneProduct
);

module.exports = router;
