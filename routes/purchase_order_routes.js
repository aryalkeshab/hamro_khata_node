const authenticateToken = require("../middleware/authenticationToken");
const {
  createPurchaseOrder,
  getPurchaseOrders,
} = require("../controllers/purchase_order_controller");

const express = require("express");
const router = express.Router();

router.post("/", createPurchaseOrder);
router.get("/", getPurchaseOrders);

module.exports = router;
// purchase is working fine
