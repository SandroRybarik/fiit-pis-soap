const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const twig = require('twig')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const config = require('./config')
const auth = require('./src/lib/auth')
// Routers
const {
  activityRouter,
  customerRouter,
  activityTypeRouter,
  reservationRouter,
} = require('./src/routes')



//http://www.passportjs.org/docs/username-password/
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true
}, auth.strategy));


passport.serializeUser(auth.passportSerialize);
passport.deserializeUser(auth.passportDeserialize);

const app = express();

// view engine setup
twig.cache(false)
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'twig');
app.set('cache', false);
app.disable('view cache');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: config.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    // secure: true 
  }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/activity', activityRouter)
app.use('/customer', customerRouter)
app.use('/activityType', activityTypeRouter)
app.use('/reservation', reservationRouter)


app.post('/login', 
  passport.authenticate(
    'local',
    { 
      successRedirect: '/',
      failureRedirect: '/customer/login'
    }
  )
)
app.get('/', (req, res) => {
  res.render('pages/root/index')
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 8000

app.listen(port, () => {console.log(`App listening on port ${port}`)})

module.exports = app;
