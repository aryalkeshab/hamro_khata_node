const authenticateToken = require("../middleware/authenticationToken");
const {
  createPurchaseOrder,
} = require("../controllers/purchase_order_controller");

const express = require("express");
const router = express.Router();

router.post("/", createPurchaseOrder);

module.exports = router;
