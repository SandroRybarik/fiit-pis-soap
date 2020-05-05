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
  activities: config.WSDL_ACTIVITIES,
  activity_types: config.WSDL_ACTIVITY_TYPES,
  branches: config.WSDL_BRANCHES,
  rooms: config.WSDL_ROOMS,
  reservations: config.WSDL_RESERVATIONS
}

module.exports = {
  soapRequest,
  wsdl
}