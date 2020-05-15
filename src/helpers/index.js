const {
    invalidDateFormat,
    pastDate,
    invalidDateOrder,
    collisionRoomAndDate,
    collisionTrainer
  } = require('./acitivityValidation')


module.exports = {
    validateEmail: require('./mailValidation'),
    invalidDateFormat,
    pastDate,
    invalidDateOrder,
    collisionRoomAndDate,
    collisionTrainer
}