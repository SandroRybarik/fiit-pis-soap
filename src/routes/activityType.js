const express = require("express");
const router = express.Router();
const {
  showCreateActivityType,
  createActivityType,
} = require("../controllers/activityType");

/* GET */
router.get("/create", showCreateActivityType);
router.post("/", createActivityType);

module.exports = router;
