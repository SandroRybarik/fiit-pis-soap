const { soapRequest, wsdl } = require("../lib/soap");
module.exports = (phone) =>
  soapRequest(wsdl.validator, "validatePhone", { phone });
