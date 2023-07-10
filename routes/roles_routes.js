const { addRoles, getRoles } = require("../controllers/roles_controller");

const express = require("express");
const router = express.Router();

router.post("/", addRoles);
router.get("/", getRoles);

module.exports = router;
