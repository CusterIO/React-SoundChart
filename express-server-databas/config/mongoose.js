/**
 * Mongoos configuration
 * A Mongoose script connecting to a MongoDB database given a MongoDB Connection URI.
 * @author Roger Hurtig
 * @version 1.0.0
 */

/**
 * @module mongoose.js - inspired by:
 * https://github.com/mongolab/mongodb-driver-examples/blob/master/nodejs/mongooseSimpleExample.js
 * https://github.com/1dv023/exercise-pure-approval-SOLUTION/blob/master/config/mongoose.js
 */

'use strict'
const mongoose = require('mongoose')

require('dotenv').config() // Requires the environment configuration.

const uri = process.env.URI

module.exports.run = async () => {
  // Global promise library.
  mongoose.Promise = global.Promise // Promise from node.

  // Bind connection to event (to get notifications)
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connection open.')
  })

  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error: ', err)
  })

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection disconnected')
  })

  // If the Node process ends, close the Mongoose connection.
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connection disconnected through app termination.')
      process.exit(0) // 0 - calculated exit.
    })
  })
  // Connect to the server.
  return mongoose.connect(uri, { user: process.env.USER, pass: encodeURIComponent(process.env.USERPSW) })
}
