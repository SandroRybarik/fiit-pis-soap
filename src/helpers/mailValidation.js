const { soapRequest, wsdl } = require("../lib/soap");
module.exports = () => soapRequest(wsdl.validator, "validateEmail", { email });
