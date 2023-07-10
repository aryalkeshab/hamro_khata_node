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
router.put("/:id", authenticateToken, updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
