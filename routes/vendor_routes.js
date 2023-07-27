const authenticateToken = require("../middleware/authenticationToken");
const permissionMiddleware = require("../middleware/permissionMiddleware");
const {
  createVendor,
  getVendors,
  deleteVendor,
} = require("../controllers/vendors_controller");

const express = require("express");
const router = express.Router();

router.post(
  "/",
  permissionMiddleware("create_vendor"),
  authenticateToken,
  createVendor
);
router.get(
  "/",
  permissionMiddleware("get_vendor_list"),
  authenticateToken,
  getVendors
);
router.delete(
  "/:id",
  permissionMiddleware("delete_vendor"),
  authenticateToken,
  deleteVendor
);

module.exports = router;
