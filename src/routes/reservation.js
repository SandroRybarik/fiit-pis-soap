const express = require("express");
const router = express.Router();
const {
  createReservation
} = require("../controllers/reservation");

/* GET */
router.post("/", createReservation);

module.exports = router;
