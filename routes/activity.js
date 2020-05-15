const express = require("express");
const router = express.Router();
const { soapRequest, wsdl } = require("../lib/soap");
const activityValidator = require("../lib/acitivityValidator")

/* GET home page. */
router.get("/create", function (req, res, next) {

  const getAllActivityTypes = () => soapRequest(wsdl.activity_type, "getAll", {});

  const dataMockup = {
    trainers: [
      { name: "Matej Lošický", id: 10 },
      { name: "Roman Marek", id: 11 },
      { name: "Ivana Lumanová", id: 1 }
    ],
    rooms: [
      { name: 'Miestnosť S1', id: 1 },
      { name: 'Miestnosť M1', id: 2 },
      { name: 'Miestnosť M2', id: 3 },
      { name: 'Miestnosť L1', id: 4 },
      { name: 'Miestnosť L2', id: 5 },
    ],
    branches: [
      { name: 'Bratislava I', id: 1 },
      { name: 'Bratislava II', id: 2 },
      { name: 'Košice', id: 3 }
    ]
  }

  getAllActivityTypes()
    .then(({activity_types}) => {
      console.log(activity_types)
      res.render("pages/activity/create", { activity_types: activity_types.activity_type, ...dataMockup });
    })
    .catch(console.log)

});

router.get("/", function (req, res, next) {
  const getAllActivities = () => soapRequest(wsdl.activity, "getAll", {});

  getAllActivities()
    .then(({ activitys }) => {
      console.log(activitys);
      res.render("pages/activity/show_all", {
        activities: activitys != null ? activitys.activity.filter(a => a.confirmed) : [],
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
  } = req.body;

  // Simulate approval process
  const confirmed = Math.random() > 0.5 ? true : false

  const createActivity = () => 
    soapRequest(
      wsdl.activity,
      'insert',
      {
        activity: {
          name,
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
