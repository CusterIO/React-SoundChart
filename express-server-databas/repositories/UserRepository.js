/**
 * Module for the user repository.
 *
 * @author Roger Hurtig
 * @version 1.0.0
 */

'use strict'
const AppUser = require('../models/appUser')
const Membership = require('../models/membership')
/**
 * Represents user repository.
 *
 * @class UserRepositry
 */
class UserRepository {
  /**
   * Adds a user to the persistent storage.
   *
   * @param {User} Membership
   * @returns {Promise<User>}
   */
  async addMember (Membership) {
    return Membership.save()
  }
  /**
   * Adds a user to the persistent storage.
   *
   * @param {User} Membership
   * @returns {Promise<User>}
   */
  async addUser (AppUser) {
    return AppUser.save()
  }
  /**
   * Gets all snippets ordered ascending.
   *
   * @returns {Promise<Snippet[]>}
   */
  async getAllAppUser () {
    // Build query (query builder chaining syntax)
    return AppUser
      .find({})
      .sort({'score': -1}) // -1 stands for descending
      .exec()
  }
  /**
   * Gets all Members ordered ascending.
   *
   * @returns {Promise<Snippet[]>}
   */
  async getAllScoreAppUser (incId) {
    // Build query (query builder chaining syntax)
    return AppUser
      .find({ 'id': incId })
      .sort({'score': -1})
      .exec()
  }
  /**
   * Delete Score by id.
   *
   * @returns {Promise<Snippet[]>}
   */
  async deleteSpecificScore (_id) {
    // Build query (query builder chaining syntax)
    return AppUser
      .findByIdAndRemove(_id)
      .sort('score')
      .exec()
  }
  /**
   * Gets Member by id.
   *
   * @returns {Promise<Snippet[]>}
   */
  async getSpecificUser (id) {
    // Build query (query builder chaining syntax)
    return AppUser
      .findById(id)
      .sort('createdAt')
      .exec()
  }
  /**
   * Edit Member by id.
   *
   * @returns {Promise<Snippet[]>}
   */
  async editSpecificUser (id, updateObj) {
    // Build query (query builder chaining syntax)
    return AppUser
      .findByIdAndUpdate(id, updateObj) // Might need { new: true }
      .sort('createdAt')
      .exec()
  }
  /**
   * Gets all snippets ordered ascending.
   *
   * @returns {Promise<Snippet[]>}
   */
  async getAllHomepageMembers () {
    // Build query (query builder chaining syntax)
    return Membership
      .find({})
      .sort({}) // -1 stands for descending
      .exec()
  }
}

module.exports = UserRepository
