const authenticateToken = require("../middleware/authenticationToken");
const {
  createSalesOrder,
  getSalesOrders,
} = require("../controllers/sales_order_controller");

const express = require("express");
const router = express.Router();

router.post("/", createSalesOrder);
router.get("/", getSalesOrders);

module.exports = router;
// sales is working fine
