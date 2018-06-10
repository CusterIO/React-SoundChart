/**
 * Starting point of the application.
 *
 * @author Roger Hurtig
 * @version 1.0.0
 */

'use strict'

// Setup --------------------------------------------------------------
const express = require('express')
const exphbs = require('express-handlebars')

const mongoose2 = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session) // For persistant session storage.
const mongoose = require('./config/mongoose.js')

const bodyParser = require('body-parser')
const path = require('path') // Core module
const helmet = require('helmet') // Collection of 12 middleware to help set some security headers.

const UserRoute = require('./routes/UserRoute')
const passport = require('passport')

const cors = require('cors')

const crypto = require('crypto')
const secureCompare = require('secure-compare')

const AppUser = require('./models/appUser')
const UserRepository = require('./repositories/UserRepository')
const Repository = new UserRepository()

require('dotenv').config() // Requires the environment configuration.
const config = require('./config.js')

const computeStats = require('./lib/computeStats') // Utility functions that goes through the visitorsData.

const app = express()
const port = process.env.PORT || 3001

const http = require('http')
// const fs = require('fs')
// const https = require('https') // Solved.
// let privateKey = fs.readFileSync('config/sslcerts/key.pem', 'utf8')
// let certificate = fs.readFileSync('config/sslcerts/cert.pem', 'utf8')
// let credentials = {key: privateKey, cert: certificate}
// Configuration -------------------------------------------------------

// Connect to the database.
mongoose.run().catch(error => {
  console.error(error)
  process.exit(1) // 1 - standard error.
})

// DISCLAIMER! The entire real time analytic app has been copied from: https://coligo.io/real-time-analytics-with-nodejs-socketio-vuejs/
// I only added this app as a fun functionality and as an inspiration to my gitHub app.
// visitorData will hold information about the active users currently on the site.
let visitorData = {}

// Start helmet for protection.
app.use(helmet()) // Disables to see if app runs.
// Start cors
app.use(cors()) // Enable All CORS Requests - might have to limit this.

// View engine
app.engine('.hbs', exphbs({
  defaultLayout: 'main', // views/layouts/main.hbs
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

// Add support for handling application/json
app.use(bodyParser.json())

// Add support for handling HTML form data
app.use(bodyParser.urlencoded({ extended: true }))

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Session cookie
const sessionOptions = { // SHould use external store for session (like a DB), to prevent session data loss in case the app restarts or crashes. Can be implemented relative easy.
  name: 'rApp', // Session cookie name, made up by me.
  key: process.env.SESSIONKEY,
  secret: process.env.SESSIONSECRET, // Made up secret, that i dont want to upload to github.
  store: new MongoStore({ mongooseConnection: mongoose2.connection }), // re-use an existing connection to MongoDB database.
  saveUninitialized: false, // Save or not save a created but not modified session.
  resave: false, // Resaves even if a request is not changing the session.
  cookie: {
    path: '/',
    secure: false, // No cookie will be send if not HTTPS is being used. Check this if no cookie gets delivered and the code looks ok.
    httpOnly: true, // Dissallows client scripts changing the cookie.
    maxAge: 1000 * 60 * 60 * 24 * 3 // Cookie will exist for 3 days.
  }
}

if (app.get('env') === 'production') {
  console.log('Production mode')
  app.set('trust proxy', 1) // trust first proxy
  sessionOptions.cookie.secure = true // serve secure cookies when running at production mode.
}

app.use(session(sessionOptions))

app.use(passport.initialize())
app.use(passport.session())

// Adding support for flash messages through the middleware pattern, that only survives 1 round trip.
app.use((request, response, next) => {
  if (request.session.flash) {
    response.locals.flash = request.session.flash // Add the flash to the context.
    delete request.session.flash // Deletes the flash from session.
  }
  next()
})

// Load routes
app.use('/', UserRoute.routes) // app.use på båda routes är original.

// Error handling ------------------------------------------------------
app.use((err, req, res, next) => {
  // 404 Not Found.
  if (err.status === 404) {
    return res.status(404).sendFile(path.join(__dirname, 'views', 'error', '404.html'))
  }

  // 500 Internal Server Error (in production, all other errors send this response).
  if (req.app.get('env') !== 'development') {
    return res.status(500).sendFile(path.join(__dirname, 'views', 'error', '500.html'))
  }

  // Development only!
  // Set locals, only providing error in development.
  res.locals.error = err

  // Render the error page.
  res.status(err.status || 500).render('error/error')
})

// Start the server
const server = http.createServer(app).listen(port, () => {
  console.log('Express started on https://localhost:' + port)
  console.log('Press Ctrl-C to terminate...')
})

// And create the websocket server
const io = require('socket.io')(server)

app.get('/payload', cors(), function (req, res) { // Enable CORS for a Single Route
  res.json({msg: 'This is CORS-enabled for a Single Route'})
})

app.post('/payload', async function (req, res) {
  // Take the post data from the App.
  let payload = req.body

  let data = payload.firstParam
  console.log(data)

  const User = new AppUser({
    user: data.user,
    id: data.id,
    score: data.score,
    nickname: data.nickname
  })

  let score = await Repository.getAllScoreAppUser(data.id) // Get the users top10 scores.

  if (score.length >= 10) {
    if (score[9].score < data.score) { // If score on last place is lower than new score....
      await Repository.deleteSpecificScore(score[9]._id) // REmove last score on user top10 list.

      await Repository.addUser(User) // Save new score to database.

      res.sendStatus(200)
    } else {
      // No new top10 user result = we dont save it.
      res.sendStatus(200)
    }
  } else { // User have less than 10 scores saved in database.
    await Repository.addUser(User) // Save user to database.
    res.sendStatus(200)
  }
})

app.get('/highscore', async function (req, res) {
  let data = await Repository.getAllAppUser() // Get all users sorted on score.

  if (data.length > 10) {
    let top10 = data.slice(0, 10) // Extract top 10 results
    console.log('send top10')
    res.json({ highscore: top10 })
  } else {
    console.log('send data')
    res.json({ highscore: data })
  }
})

app.get('/userscore/:id', async function (req, res) {
  let str = '' + req.url
  let value = str.substr(12, str.length)

  let data = await Repository.getAllScoreAppUser(value) // Get users personal top10 sorted on score.

  if (data.length > 10) {
    let top10 = data.slice(0, 10) // Extract top 10 results
    console.log('send top10')
    res.json({ profile: top10 })
  } else {
    console.log('send data')
    res.json({ profile: data })
  }
})
/*
  let signature = req.header('x-hub-signature')

  // Using the crypto module for hashing the payload and secret (added at github)
  let hmac = crypto.createHmac('sha1', process.env.HOOKERSECRET)
  hmac.update(payload)
  let hashedSecret = 'sha1=' + hmac.digest('hex')

  if (secureCompare(signature, hashedSecret)) {
    let payLoad = JSON.parse(payload)
    let Issue = [] // Contains issues
    let CoMMent = [] // Contains comments

    if (payLoad.action === 'created') {
      console.log(payLoad.action)
    }
    CoMMent.push(payLoad.comment)
    Issue.push(payLoad.issue)
    let amount = Issue.length + CoMMent.length
    io.emit('incomingHook', Issue, CoMMent, amount)

    res.sendStatus(200)
  }
  res.sendStatus(200)
}) */
// This is called every time a client is conneting
// the socket is for the client that connects
io.on('connection', function (socket) {
  let Issues = [] // Contains issues
  let Comments = [] // Contains comments

  // the application only retrieves data when '/index/socket' is visited.
  if (socket.handshake.headers.host === config.host && socket.handshake.headers.referer.indexOf(config.host + config.gitHubEndpoint) > -1) {
    // Tell all clients there is a new message - Send back to the one that wrote it
    // Emit the new issue/comment to all clients connected to the server.
    io.emit('updateshowAll', Issues, Comments)
  }
  if (socket.handshake.headers.host === config.host && socket.handshake.headers.referer.indexOf(config.host + config.analyticEndpoint) > -1) {
    // if someone visits '/index/analytics' send them the computed visitor data
    io.emit('updated-stats', computeStats(visitorData))
  }
  // Add visiting user to visitorData object.
  socket.on('visitor-data', function (data) {
    visitorData[socket.id] = data
    // compute and send visitor data to the dashboard when a new user visits the page
    io.emit('updated-stats', computeStats(visitorData))
  })

  // Called when a socket/client is disconnecting from the WS
  socket.on('disconnect', function () {
    // Remove user from visitorData object after they leave.
    delete visitorData[socket.id]

    // compute and send visitor data to the dashboard when a user leaves the page
    io.emit('updated-stats', computeStats(visitorData))
  })
})
