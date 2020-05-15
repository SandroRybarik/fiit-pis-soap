const { soapRequest, wsdl } = require("../lib/soap");

const showCreateActivity = async (_, res) => {
  try {
    const { activity_types } = await soapRequest(wsdl.activity_type, "getAll", {});
    console.log(activity_types);
    res.render("pages/activity/create", {
      activity_types: activity_types.activity_type,
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
