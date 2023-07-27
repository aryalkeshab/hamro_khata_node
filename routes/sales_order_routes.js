const authenticateToken = require("../middleware/authenticationToken");
const permissionMiddleware = require("../middleware/permissionMiddleware");
const {
  createSalesOrder,
  getSalesOrders,
} = require("../controllers/sales_order_controller");

const express = require("express");
const router = express.Router();

router.post(
  "/",
  permissionMiddleware("sales_order_create"),
  authenticateToken,
  createSalesOrder
);
router.get(
  "/",
  permissionMiddleware("sales_order_list"),
  authenticateToken,
  getSalesOrders
);

module.exports = router;
// sales is working fine
