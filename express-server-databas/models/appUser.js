/**
 * Mongoose model appUser.
 *
 * @author Roger Hurtig
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create a schema, with facebook user details.
let appUser = new Schema({
  user: String,
  nickname: String,
  id: String,
  score: String,
  dateAdded: {type: Date, default: Date.now}
})

// Create a model using the schema.
const AppUser = mongoose.model('appUser', appUser)

// Export the model.
module.exports = AppUser
