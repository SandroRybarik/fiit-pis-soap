const { soapRequest, wsdl } = require('../lib/soap')


const createActivityType = (req, res, next) => {

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
  
    
  }

  const showCreateActivityType = function(req, res, next) {
    res.render('pages/activityType/create');
  }

  module.exports = {
      showCreateActivityType,
      createActivityType
  }