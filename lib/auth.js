const { soapRequest, wsdl } = require('./soap')

function passportDeserialize(user, done) {
  console.log("passportDeserialize", user)
  done(null, user)
}

function passportSerialize(user, done) {
  console.log("passportSerialize", user)
  done(null, user)
}

function strategy(email, password, done) { // vytvori session
  console.log(email, password)
  const getCustomer = () => 
    soapRequest(
      wsdl.customer,
      'getCustomerByEmail',
      {
        email
      }
    )

  getCustomer()
    .then(({customer}) => {
      console.log(customer)
      done(null, customer)
    })
    .catch(err => {
      console.log(err)
      done(err, false, { message: 'Incorrect email.'})
    });
}

module.exports = {
    passportDeserialize, 
    passportSerialize,
    strategy
}