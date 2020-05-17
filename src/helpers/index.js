const {
    invalidDateFormat,
    pastDate,
    invalidDateOrder,
    collisionRoomAndDate,
    collisionTrainer
  } = require('./acitivityValidation')


module.exports = {
    validateEmail: require('./mailValidation'),
    validatePhone: require('./phoneValidation'),
    invalidDateFormat,
    pastDate,
    invalidDateOrder,
    collisionRoomAndDate,
    collisionTrainer
}