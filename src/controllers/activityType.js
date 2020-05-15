const { soapRequest, wsdl } = require("../lib/soap");

const createActivityType = async (req, res) => {
  try {
    await soapRequest(wsdl.activity_type, "insert", {
      activity_type: {
        name: req.body.name,
        price: +req.body.price,
        capacity: +req.body.capacity,
        description: req.body.description,
      },
    });
    res.redirect("/");
  } catch (error) {
    console.log(err);
    res.json({ status: "FAIL!" });
  }
};

const showCreateActivityType = (_, res) => {
  res.render("pages/activityType/create");
};

module.exports = {
  showCreateActivityType,
  createActivityType,
};
