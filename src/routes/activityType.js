const express = require('express');
const router = express.Router();
const { soapRequest, wsdl } = require('../lib/soap')

/* GET */
router.get('/create', function(req, res, next) {
  res.render('pages/activityType/create');
});


router.post('/', (req, res, next) => {

  const {
    name,
    price,
    capacity,
    description,
  } = req.body;

  const createActivityType = () => 
    soapRequest(
      wsdl.activity_type,
      'insert',
      {
        activity_type: {
          name,
          price: Number(price),
          capacity: Number(capacity),
          description,
        }
      }
    )

    createActivityType()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: "FAIL!" });
    });

  
})


module.exports = router;