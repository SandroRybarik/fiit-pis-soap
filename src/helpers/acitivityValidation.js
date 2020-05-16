// returs to *true* if check is correct

const invalidDateFormat = ({ start_date, end_date }) => 
  !isNaN(Date.parse(start_date)) && !isNaN(Date.parse(end_date))

const pastDate = ({ start_date, end_date }) => 
  Date.parse(start_date).getTime() > Date.now().getTime() && 
  Date.parse(end_date).getTime() > Date.now().getTime()

const invalidDateOrder = ({ start_date, end_date }) => 
  Date.parse(start_date).getTime() < Date.parse(end_date).getTime() 

const collisionRoomAndDate = (/*{ room_id, end_date }*/) => true

const collisionTrainer = (/*{ trainer_id }*/) => true


module.exports = {
  invalidDateFormat,
  pastDate,
  invalidDateOrder,
  collisionRoomAndDate,
  collisionTrainer
}
