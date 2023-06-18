const authenticateToken = require("../middleware/authenticationToken");
const {
  createVendor,
  getVendors,
  deleteVendor,
} = require("../controllers/vendors_controller");

const express = require("express");
const router = express.Router();

router.post("/", createVendor);
router.get("/", getVendors);
router.delete("/:id", deleteVendor);

module.exports = router;
