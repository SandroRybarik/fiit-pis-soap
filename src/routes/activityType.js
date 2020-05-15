const express = require("express");
const router = express.Router();
const {
  showCreateActivityType,
  createActivityType,
} = require("../controllers/activityType");

/* GET */
router.get("/create", createActivityType);
router.post("/", showCreateActivityType);

module.exports = router;
