const config = require('../config')
const soap = require('soap')
/**
 * Set auth object in place.
 */
const auth = {
  team_id: config.TEAM_ID,
  team_password: config.TEAM_PASSWORD
}

/**
 * Promise-based wrapper around soap client api
 * @param {string} url 
 * @param {object} payload 
 */
const soapRequest = (url, func, payload) => new Promise((resolve, reject) => {
  console.log(
    {
      func,
      ...auth,
      ...payload
    }
  )
    soap.createClient(url, function(err, client) {
      client[func]({
        ...auth,
        ...payload
      }, function(err, result) {
          if (err) { reject(err) }
          resolve(result)
      })
  })
})

wsdl = {
  activity: config.WSDL_ACTIVITY,
  activity_type: config.WSDL_ACTIVITY_TYPE,
  branche: config.WSDL_BRANCHE,
  room: config.WSDL_ROOM,
  reservation: config.WSDL_RESERVATION,
  customer: config.WSDL_CUSTOMER,
  validator: config.WSDL_VALIDATOR,
  cities_sk: config.WSDL_CITIES_SK
}

module.exports = {
  soapRequest,
  wsdl
}