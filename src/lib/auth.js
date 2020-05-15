const { soapRequest, wsdl } = require("./soap");
const { login } = require("../controllers/user");

const passportDeserialize = async (id, done) => {
  console.log("passportDeserialize", id);
  const { user } = await soapRequest(wsdl.user, "getById", { id });
  done(null, customer);
};

const passportSerialize = async (user, done) => {
  console.log("passportSerialize", user.id);
  done(null, user.id);
};

module.exports = {
  passportDeserialize,
  passportSerialize,
  strategy: login,
};
