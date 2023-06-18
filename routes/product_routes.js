const authenticateToken = require("../middleware/authenticationToken");

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product_controller");

const express = require("express");
const router = express.Router();
router.post("/", addProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;

// all methods in the routes are working fine tested with postman
