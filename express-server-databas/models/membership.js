/**
 * Mongoose model Membership.
 *
 * @author Roger Hurtig
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
// Create a schema, with facebook user details.
let membershipSchema = new Schema({
  provider: String,
  providerUserId: String,
  accessToken: String,
  name: String,
  email: String,
  username: String,
  facebook: Object,
  userId: {type: ObjectId, ref: 'User'},
  dateAdded: {type: Date, default: Date.now}
})

// Create a model using the schema.
const MemberShip = mongoose.model('Membership', membershipSchema)

// Export the model.
module.exports = MemberShip
