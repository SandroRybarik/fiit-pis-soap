const { soapRequest, wsdl } = require("../lib/soap");

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


const showCreateActivity = async (_, res) => {
  try {
    const { activity_types } = await soapRequest(wsdl.activity_type, "getAll", {});
    console.log(activity_types);
    res.render("pages/activity/create", {
      activity_types: activity_types.activity_type,
      ...dataMockup
    });
  } catch (error) {
    console.log(error);
  }
};

const showAllActivities = async (_, res) => {
  try {
    const { activitys } = await soapRequest(wsdl.activity, "getAll", {});
    console.log(activitys);
    res.render("pages/activity/show_all", {
      activities: activitys != null ? activitys.activity : [],
    });
  } catch (error) {
    console.log(error);
  }
};

const handleCreateActivity = async (req, res) => {
  try {
    await soapRequest(wsdl.activity, "insert", {
      activity: {
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        activity_type_id: req.body.activity_type_id,
        trainer_id: req.body.trainer_id,
        room_id: req.body.room_id,
        branch_id: req.body.branch_id,
        confirmed: req.body.confirmed,
      },
    });
    res.redirect("/activity");
  } catch (error) {
    console.log(err);
    res.json({ status: "FAIL!" });
  }
};

module.exports = {
  showCreateActivity,
  showAllActivities,
  handleCreateActivity,
};