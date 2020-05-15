const express = require("express");
const router = express.Router();
const { showLogin, showCreate, create } = require("../controllers/user");

router.get("/create", create);
router.get("/login", showLogin);
router.post("/", showCreate);

module.exports = router;
