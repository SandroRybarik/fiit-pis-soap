const { soapRequest, wsdl } = require("../lib/soap");

const createReservation = async (req, res) => {
  console.log(req.user)
  const userId  = req.user.id

  try {
    await soapRequest(wsdl.reservation, "insert", {
      activity_type: {
        reservation: {
          user_id: userId,
          activity_id: +req.body.activity_id,
        }
      },
    });
    res.json({})
  } catch (error) {
    console.log(err);
    res.json({ status: "FAIL!" });
  }
};

module.exports = {
  createReservation 
}
