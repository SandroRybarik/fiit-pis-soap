const express = require('express');
const router = express.Router();
const { soapRequest, wsdl } = require('../lib/soap')
const passport = require('passport')
/* GET home page. */
router.get('/create', (req, res, next) => {
    console.log(req.user)
  res.render('pages/customer/create')
});

router.get('/login', (_, res) => {
  res.render('pages/customer/login')
})

router.post('/', (req, res) => {
  const {
    name,
    surname,
    email,
    gender,
    currency,
    city,
    born_at
  } = req.body;

  const validateEmail = () =>
    soapRequest(
      wsdl.validator, 
      'validateEmail', 
      { email }
    )
  
  const resolveCityByName = ( name ) => 
      soapRequest(
        wsdl.cities_sk,
        'getByName',
        {
          name
        }
      )

  const register = ({ coord_lon, coord_lat }) =>
    soapRequest(
      wsdl.customer, 
      'register', 
      {
        name,
        surname,
        email,
        gender,
        currency,
        coord_lon,
        coord_lat,
        born_at    
      }
    )
  
  validateEmail()
  .then( result => {
    if(result.success)
    return resolveCityByName(city)
  })
  .then(({ city }) => {
    return register(city)
  })
  .then(result => {
    res.json(result)
  })
  .catch( err => {
    console.log(err)
  })
})



module.exports = router;
