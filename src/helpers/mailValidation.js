const { soapRequest, wsdl } = require("../lib/soap");
module.exports = (email) =>
  soapRequest(wsdl.validator, "validateEmail", { email });
