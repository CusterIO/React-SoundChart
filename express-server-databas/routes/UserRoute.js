/**
 * User routes.
 *
 * @author Roger Hurtig
 * @version 1.0.0
 */

'use strict'
const router = require('express').Router()
const UserController = require('../controllers/UserController')
const restrict = require('../lib/restrict') // Restriction module. Limits access.

let Membership = require('../models/membership.js')
// const bcrypt = require('bcrypt') // Generate salt and hash.

require('dotenv').config() // Requires the environment configuration.
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

passport.use(new FacebookStrategy({
  clientID: process.env.FACEAPID,
  clientSecret: process.env.FACESECRET,
  callbackURL: 'https://178.62.114.130/callbackFB',
  enableProof: true
},
function (accessToken, refreshToken, profile, cb) {
  // check user table for anyone with a facebook ID of profile.id
  Membership.findOne({
    'facebook.id': profile.id
  }, function (err, membershipData) {
    if (err) {
      return cb(err)
    }
    // No user was found... so create a new user with values from Facebook (all the profile. stuff)
    if (!membershipData) {
      // refreshToken = undefined
      membershipData = new Membership({
        name: profile.displayName,
        // email: profile.emails[0].value,
        username: profile.username,
        provider: 'facebook',
        accessToken: accessToken,
        // now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
        facebook: profile._json
      })
      membershipData.save(function (err) {
        if (err) console.log(err)
        return cb(err, membershipData)
      })
    } else {
      // found user. Return
      return cb(err, membershipData)
    }
  })
}
))

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
  done(null, user.id)
})
// used to deserialize the user
passport.deserializeUser(function (id, done) {
  Membership.findById(id, function (err, user) {
    done(err, user)
  })
})

/**
 * Represents a user route.
 */
class UserRouter {
  /**
   * Gets the routes.
   *
   * @readonly
   * @static
   */
  static get routes () {
    // NOTE: Must use .bind(UserRouter.controller) to set this to refer to the
    //       correct instance, and not undefiend, in the UserController
    ///      class' methods index, create and createPost.

    // The root (/) Served by public index.html
    UserRouter.router.get('/', UserRouter.controller.index.bind(UserRouter.controller))
    UserRouter.router.get('/index', restrict.isRestricted, UserRouter.controller.indexMember.bind(UserRouter.controller))

    // Real time Analytics
    UserRouter.router.route('/index/analytics', restrict.isRestricted)
      .get(UserRouter.controller.analytics.bind(UserRouter.controller))

    // Login account (/login)
    UserRouter.router.route('/login')
      .get(UserRouter.controller.login.bind(UserRouter.controller))

    // Login account (/login/facebook)
    UserRouter.router.route('/login/facebook')
      .get(passport.authenticate('facebook', { scope: ['public_profile', 'email'] }))

    // Login account (/callbackFB)
    UserRouter.router.route('/callbackFB')
      .get(passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/index' }), (err, user, info) => {
        console.log(err, user, info)
      })

    // Profile
    UserRouter.router.route('/profile', restrict.isRestricted)
      .get(UserRouter.controller.profile.bind(UserRouter.controller))

    // Logout (/logout)
    UserRouter.router.route('/logout', restrict.isRestricted)
      .get(UserRouter.controller.logout.bind(UserRouter.controller))

    return UserRouter.router
  }
}

// Default values for static properties.
UserRouter.controller = new UserController() // Dependency injection.
UserRouter.router = router

// Exports.
module.exports = UserRouter
