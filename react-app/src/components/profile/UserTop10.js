import React, { Component } from 'react'
import BackButton from './UserTop10BackButton'
import ErrorBoundary from '../ErrorBoundary'
import ProfileTop10List from './ProfileTop10List'
require('dotenv').config()
let secret = process.env.REACT_APP_USERTOPURL // Part of the url to the express server.
let theID = ID() // The auth. user's id - used when searching in database.

let url = secret + theID

function ID () {
  if (window.sessionStorage.getItem('data')) { // If the user is logged in...
    let data = window.sessionStorage.getItem('data')
    let data2 = JSON.parse(data)
    if (data2.id.length >= 1) { // And has an id with atleast 1 character...
      return data2.id // Return the id.
    } else {} // Auth. user has no id - return.
  } else {} // User not logged in - return.
}

function handleErrors (response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

class UserTop10 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: [
        {_id: 1, user: 'Offline Darth Vader', nickname: 'The Darkside', score: '24', dateAdded: '2018-04-14'},
        {_id: 2, user: 'Offline Yoda', nickname: 'Yoda The', score: '22', dateAdded: '2018-04-14'},
        {_id: 3, user: 'Offline Jedi', nickname: 'The Force', score: '20', dateAdded: '2018-04-14'},
        {_id: 4, user: 'Cant connect to express server', nickname: 'Mr Error', score: '500', dateAdded: '2018-04-26'}
      ]
    }
  }

  componentDidMount () {
    fetch(url)
      .then((response) => handleErrors(response))
      .then((response) => {
        console.log('ok')
        let data = response.json()
        return data
      }).then((data) => {
        this.setState({
          profile: data.profile
        })
      }).catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <div className="components">
        <h1>Your Top 10 Scores</h1>
        <ErrorBoundary>
          <ProfileTop10List
            profile={this.state.profile}
          />
        </ErrorBoundary>
        <BackButton />
      </div>
    )
  }
}

export default UserTop10
