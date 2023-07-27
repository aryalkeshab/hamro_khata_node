const authenticateToken = require("../middleware/authenticationToken");
const permissionMiddleware = require("../middleware/permissionMiddleware");

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product_controller");

const express = require("express");
const router = express.Router();
router.post(
  "/",
  permissionMiddleware("add_product"),
  authenticateToken,
  addProduct
);
router.get(
  "/",
  permissionMiddleware("get_product"),
  authenticateToken,
  getProducts
);
router.put(
  "/:id",
  permissionMiddleware("update_product"),
  authenticateToken,
  updateProduct
);
router.delete(
  "/:id",
  permissionMiddleware("delete_product"),
  authenticateToken,
  deleteProduct
);

module.exports = router;
