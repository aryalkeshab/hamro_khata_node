const authenticateToken = require("../middleware/authenticationToken");
const {
  createCustomer,
  getCustomers,
  deleteCustomers,
} = require("../controllers/customer_controller");

const express = require("express");
const router = express.Router();

router.post("/", authenticateToken, createCustomer);
router.get("/", authenticateToken, getCustomers);
router.delete("/:id", authenticateToken, deleteCustomers);
module.exports = router;
