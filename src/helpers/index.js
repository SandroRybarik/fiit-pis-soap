const {
    invalidDateFormat,
    pastDate,
    invalidDateOrder,
    collisionRoomAndDate,
    collisionTrainer
  } = require('./acitivityValidator')


module.exports = {
    validateEmail: require('./mailValidation'),
    invalidDateFormat,
    pastDate,
    invalidDateOrder,
    collisionRoomAndDate,
    collisionTrainer
}