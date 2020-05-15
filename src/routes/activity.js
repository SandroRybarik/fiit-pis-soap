const express = require("express");
const router = express.Router();
const { soapRequest, wsdl } = require("../lib/soap");
const {
  showCreateActivity,
  showAllActivities,
  handleCreateActivity,
} = require("../controllers/activity");

/* GET home page. */
router.get("/create", showCreateActivity);
router.get("/", showAllActivities);

// CREATE
router.post("/", handleCreateActivity);

module.exports = router;
