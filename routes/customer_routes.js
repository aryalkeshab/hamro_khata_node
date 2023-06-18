const authenticateToken = require("../middleware/authenticationToken");
const {
  createCustomer,
  getCustomers,
  deleteCustomers,
} = require("../controllers/customer_controller");

const express = require("express");
const router = express.Router();

router.post("/", createCustomer);
router.get("/", getCustomers);
router.delete("/:id", authenticateToken, deleteCustomers);
module.exports = router;
