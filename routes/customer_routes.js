const authenticateToken = require("../middleware/authenticationToken");
const permissionMiddleware = require("../middleware/permissionMiddleware");

const {
  createCustomer,
  getCustomers,
  deleteCustomers,
} = require("../controllers/customer_controller");

const express = require("express");
const router = express.Router();

router.get(
  "/",
  permissionMiddleware("get_customer_list"),
  authenticateToken,
  getCustomers
);

router.delete(
  "/:id",
  permissionMiddleware("delete_customer"),
  authenticateToken,
  deleteCustomers
);
router.post(
  "/",
  permissionMiddleware("create_customer_list"),

  authenticateToken,
  (req, res) => {
    createCustomer(req, res);
  }
);

module.exports = router;
