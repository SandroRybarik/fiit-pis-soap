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
const soapRequest = (url, payload) => new Promise((resolve, reject) => {
  console.log(
    {
      ...auth,
      ...payload
    }
  )
    soap.createClient(url, function(err, client) {
      client.insert({
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
  activity_types: config.WSDL_ACTIVITY_TYPE,
  branches: config.WSDL_BRANCHE,
  rooms: config.WSDL_ROOM,
  reservations: config.WSDL_RESERVATION
}

module.exports = {
  soapRequest,
  wsdl
}