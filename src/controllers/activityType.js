const { soapRequest, wsdl } = require('../lib/soap')


const createActivityType = async (req, res) => {

    const {
      name,
      price,
      capacity,
      description,
    } = req.body;
  
    try {
        await soapRequest(
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
        res.redirect('/');
    }
    catch(error){
        console.log(err);
        res.json({ status: "FAIL!" });
    }
    
}

const showCreateActivityType = (_, res) => {
    res.render('pages/activityType/create');
}

module.exports = {
    showCreateActivityType,
    createActivityType
}