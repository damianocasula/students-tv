const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const methodOverride = require('method-override')
const path = require('path')

const User = require('./models/utente')

// Database configuration
const db = require('./db')
mongoose.connect(`mongodb+srv://${db.user}:${db.password}@${db.host}/${db.name}?retryWrites=true&w=majority`, {
  useNewUrlParser: true
})

mongoose.Promise = global.Promise

// Express configuration
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')))
app.use(methodOverride('_method'))
app.locals.moment = require('moment')

// Express session configuration
app.use(require('express-session')({
  secret: 'Sentence calico roseate forgiven solicit solo money and superb',
  resave: false,
  saveUninitialized: false
}))

// Passport configuration
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Flash configuration
app.use(flash())
app.use((req, res, next) => {
  res.locals.utenteAttuale = req.user
  res.locals.error = req.flash('error')
  res.locals.success = req.flash('success')
  next()
})

// Routes configuration
app.use('/', require('./routes/index'))
app.use('/videos', require('./routes/videos'))
app.use('/videos/:id/commenti', require('./routes/commenti'))

// Web server configuration
const port = process.env.PORT || 3000

app.listen(port, process.env.IP, () => {
  console.log(`Il server è online su http://localhost:${port}`)
})
