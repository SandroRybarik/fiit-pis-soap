const { soapRequest, wsdl } = require("../lib/soap");
const { validateEmail } = require("../helpers");

const create = async (req, res) => {

  try{
    const {success} = await validateEmail(req.body.email)
  
    if(success){
      await soapRequest(wsdl.user, "insert", {
        user: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          phone_number: req.body.phone_number,
          country_code: req.body.country_code,
          score: 0
        },
      });
    }

  }
  catch(error){
    console.log(error)
  }
  

};

const showCreate = (req, res) => {
  res.render('pages/user/create')
}

const showLogin = (req, res) => {
  res.render('pages/user/login')
}

module.exports = {
  showLogin,
  showCreate,
  create
}