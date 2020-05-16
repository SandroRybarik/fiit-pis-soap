const express = require("express");
const router = express.Router();
const { showLogin, showCreate, create } = require("../controllers/user");

router.get("/create", showCreate);
router.get("/login", showLogin);
router.post("/", create);

module.exports = router;
