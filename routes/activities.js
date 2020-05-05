const express = require('express');
const router = express.Router();
const { soapRequest, wsdl } = require('./../lib/soap')

/* GET home page. */
router.get('/create', function(req, res, next) {
  res.render('pages/activities/create', { title: 'Express' })
})

// CREATE
router.post('/', function(req, res, next) {

  soapRequest(wsdl.activities, {
    activities: {
      name: null,
      start_date: null,
      end_date: null,
      activity_type_id: req.body.activity_type_id,
      trainer_id: req.body.trainer_id,
      room_id: req.body.room_id,
      branch_id: req.body.branch_id,
      confirmed: false
    }
  }).then(result => {
    res.json({ status: 'OK!' })
  }).catch(err => {
    console.log(err)
    res.json({ status: 'FAIL!' })
  })
})

module.exports = router;
