/**
 * Module for the user controller.
 *
 * @author Roger Hurtig
 * @version 1.0.0
 */

'use strict'
require('dotenv').config() // Requires the environment configuration.
const path = require('path') // Core module

const UserRepository = require('../repositories/UserRepository')

class UserController {
  /**
   * Creates an instance of UserController.
   *
   * @param {UserRepository} [repository=new UserRepository()]
   */
  constructor (repository = new UserRepository()) {
    this._repository = repository // For test the application.
  }
  /**
   * Launches the chartApp.
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   */
  /*
  async chartApp (req, res) {
    let viewModel = {username: true}
    let data = await res.sendFile(path.join(__dirname, '..', 'public', 'build', 'index.html'), viewModel)
    return data
  }
  */
  /**
   * Launches the analytic app.
   * DISCLAIMER! The entire real time analytic app has been copied from: https://coligo.io/real-time-analytics-with-nodejs-socketio-vuejs/
   * I only added this app as a fun functionality and as an inspiration to my gitHub app.
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   */
  async analytics (req, res) {
    if (req.session.passport.user) {
      let viewModel = {username: true}
      let data = await res.sendFile(path.join(__dirname, '..', 'views', 'user', 'rApp.html'), viewModel)
      return data
    }
  }
  /**
   * Sends a response containing all official snippets.
   * Starting page.
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   */
  async login (req, res) {
    try {
      const viewModel = { nouser: true } // To show start msg.
      res.render('user/login', viewModel)
    } catch (error) {
      const viewModel = {
        flash: { type: 'danger', text: error.message },
        snippets: 'unknown error occured'
      }
      res.render('/index', viewModel)
    }
  }
  /**
   * Sends a response containing all official snippets.
   * Starting page.
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   */
  async index (req, res) {
    try {
      const viewModel = { nouser: true } // To show start msg.
      res.render('user/index', viewModel)
    } catch (error) {
      const viewModel = {
        flash: { type: 'danger', text: error.message },
        snippets: 'unknown error occured'
      }
      res.render('user/index', viewModel)
    }
  }
  /**
   * Sends a response containing all issues for the respository.
   * Starting page, after login.
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   */
  async indexMember (req, res) {
    try {
      if (req.session.passport.user) {
        if (req.session.passport.user === process.env.ADMIN) { // Admin rights on developer login.
          const viewModel = { application: [{app: 'SoundChart', info: 'Rates sound by its decibel level!', ip: 'https://178.62.48.216'}], username: true, admin: true }
          return res.render('user/index', viewModel)
        }
        const viewModel = { application: [{app: 'SoundChart', info: 'Rates sound by its decibel level!'}], username: true }
        return res.render('user/index', viewModel)
      }
      if (!req.session.passport.user) {
        let error = new Error('Forbidden!')
        error.status = 403
        const viewModel = {
          validationErrors: [error]
        }
        return res.render('user/index', viewModel)
      }
    } catch (error) {
      const viewModel = {
        flash: { type: 'danger', text: error.message },
        snippets: 'error occured'
      }
      res.render('user/index', viewModel)
    }
  }
  /**
   * Logout route that destroys the session id and redirects back to the home route.
   *
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   */
  async logout (req, res) {
    try {
      if (req.session) {
        req.session.destroy()
        res.redirect('/')
      }
    } catch (error) {
      const viewModel = {
        validationErrors: [error.message]
      }
      return res.render('user/profile', viewModel)
    }
  }
  /**
   * Profile page, showing user's github name.
   *
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   */
  async profile (req, res) {
    try {
      if (req.session.passport.user === null || !req.session.passport.user) {
        let err = new Error('Not authorized!')
        err.status = 400
        const viewModel = {
          validationErrors: [err]
        }
        return res.render('user/index', viewModel)
      }
      if (req.session.passport.user) {
        if (req.session.passport.user === process.env.ADMIN) { // Admin rights to developer.
          const dataMembers = await this._repository.getAllHomepageMembers()
          const viewModel = { member: dataMembers, username: true, admin: true }
          return res.render('user/profile', viewModel)
        }
        const dataMembers = await this._repository.getAllHomepageMembers()
        const viewModel = { member: dataMembers, username: true }
        return res.render('user/profile', viewModel)
      }
    } catch (error) {
      const viewModel = {
        validationErrors: [error.message]
      }
      return res.render('user/index', viewModel)
    }
  }
}

// Export.
module.exports = UserController
