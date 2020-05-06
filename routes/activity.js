const express = require("express");
const router = express.Router();
const { soapRequest, wsdl } = require("../lib/soap");

/* GET home page. */
router.get("/create", function (req, res, next) {
  res.render("pages/activity/create", { title: "Express" });
});

router.get("/", function (req, res, next) {
  const getAllActivities = () => soapRequest(wsdl.activity, "getAll", {});

  getAllActivities()
    .then(({ activitys }) => {
      console.log(activitys);
      res.render("pages/activity/show_all", {
        activities: activitys != null ? activitys.activity : [],
      });
    })
    .catch(console.log);
});

// CREATE
router.post("/", function (req, res, next) {
  const {
    name,
    start_date,
    end_date,
    activity_type_id,
    trainer_id,
    room_id,
    branch_id,
    confirmed,
  } = req.body;


  const createActivity = () => 
    soapRequest(
      wsdl.activity,
      'insert',
      {
        activity: {
          name: 'activitka',
          start_date,
          end_date,
          activity_type_id,
          trainer_id,
          room_id,
          branch_id,
          confirmed
        }
      }
    )

  createActivity()
    .then(() => {
      res.redirect('/activity');
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: "FAIL!" });
    });
});

module.exports = router;
