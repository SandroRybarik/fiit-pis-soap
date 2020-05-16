const { soapRequest, wsdl } = require("../lib/soap");
const { validateEmail } = require("../helpers");

const login = async (email, password, done) => {
  // vytvori session
  console.log("tu som do riti");
  try {
    const { users } = await soapRequest(wsdl.user, "getByAttributeValue", {
      attribute_name: "email",
      attribute_value: email,
      ids: [ 0 ], // blbost, proste to zerie pole id na filtrovalie a nezoberie to array literal... asi  problem s xml
    });

    users.user[0].score += Math.floor(Math.random() * 10) + 10
    console.log(users.user[0]);
    done(null, users.user[0]);
  } catch (error) {
    console.log(error.message);
    done(null, false, { message: "Incorrect password" });
  }
};

const create = async (req, res) => {
  try {
    const { success } = await validateEmail(req.body.email);

    if (success) {
      await soapRequest(wsdl.user, "insert", {
        user: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          phone_number: req.body.phone_number,
          country_code: req.body.country_code,
          score: 0,
          role: req.body.role
        },
      });
    }
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const showCreate = (req, res) => {
  res.render("pages/user/create", { trainer: req.query.trainer !== undefined });
};

const showLogin = (req, res) => {
  res.render("pages/user/login");
};

module.exports = {
  showLogin,
  showCreate,
  create,
  login,
};
