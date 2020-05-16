const { soapRequest, wsdl } = require("../lib/soap");

const createReservation = async (req, res) => {
  console.log(req.user)
  const userId  = req.user.id

  try {
    const result = await soapRequest(wsdl.reservation, "getByAttributeValue", {
      attribute_name: "activity_id",
      attribute_value: +req.body.activity_id,
      ids: [0]
    })
    console.log(result)
    if (result.reservations && result.reservations.reservation.filter(r => r.user_id === userId).length !== 0) {
      return res.status(409).json({})
    }

    await soapRequest(wsdl.reservation, "insert", {
      reservation: {
        name: "",
        user_id: userId,
        activity_id: +req.body.activity_id,
      }
    });
    return res.json({})
  } catch (error) {
    console.log(error);
    res.json({ status: "FAIL!" });
  }
};

module.exports = {
  createReservation 
}
