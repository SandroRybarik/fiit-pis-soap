const { soapRequest, wsdl } = require('./soap')

const _cache = {}

function passportDeserialize(id, done) {
  console.log("passportDeserialize", id)

  const getCustomer = () => 
    soapRequest(
      wsdl.customer,
      'getCustomerById',
      {
        id
      }
    )

  if (_cache[id] != null){
    return done(null, _cache[id])
  }
  else {
    getCustomer()
      .then(({customer}) => {
        _cache[customer.id] = customer
        done(null, customer)
      })
  }

  
  
}

function passportSerialize(user, done) {
  console.log("passportSerialize", user.id)
  done(null, user.id)
}

function strategy(email, password, done) { // vytvori session
  // console.log(email, password)
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
      done(null, customer)
    })
    .catch(err => {
      console.log({ error: err.message})
      done(null, false, { message: 'Incorrect password'})
    });
}

module.exports = {
    passportDeserialize, 
    passportSerialize,
    strategy
}