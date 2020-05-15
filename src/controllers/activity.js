const { soapRequest, wsdl } = require("../lib/soap");

const showCreateActivity = function (req, res, next) {
  const getAllActivityTypes = () =>
    soapRequest(wsdl.activity_type, "getAll", {});

  getAllActivityTypes()
    .then(({ activity_types }) => {
      console.log(activity_types);
      res.render("pages/activity/create", {
        activity_types: activity_types.activity_type,
      });
    })
    .catch(console.log);
};

const showAllActivities = function (req, res, next) {
  const getAllActivities = () => soapRequest(wsdl.activity, "getAll", {});

  getAllActivities()
    .then(({ activitys }) => {
      console.log(activitys);
      res.render("pages/activity/show_all", {
        activities: activitys != null ? activitys.activity : [],
      });
    })
    .catch(console.log);
};

const handleCreateActivity = function (req, res, next) {
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
  }


module.exports = {
    showCreateActivity,
    showAllActivities,
    handleCreateActivity
};
