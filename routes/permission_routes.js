const {
  addPermission,
  getPermissions,
} = require("../controllers/permission_controller");

const express = require("express");
const router = express.Router();

router.post("/", addPermission);
router.get("/", getPermissions);

module.exports = router;
