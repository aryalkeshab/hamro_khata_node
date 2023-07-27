const authenticateToken = require("../middleware/authenticationToken");
const permissionMiddleware = require("../middleware/permissionMiddleware");

const {
  createPurchaseOrder,
  getPurchaseOrders,
} = require("../controllers/purchase_order_controller");

const express = require("express");
const router = express.Router();

router.post(
  "/",
  permissionMiddleware("purchase_order_create"),
  authenticateToken,
  createPurchaseOrder
);
router.get(
  "/",
  permissionMiddleware("purchase_order_list"),
  authenticateToken,
  getPurchaseOrders
);

module.exports = router;
// purchase is working fine
