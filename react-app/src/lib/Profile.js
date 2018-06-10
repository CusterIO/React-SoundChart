import React, { Component } from 'react'
import ProfileDetails from '../components/profile/ProfileDetails'
import EPB from '../components/profile/EditProfileButton'
import EditProfile from '../components/profile/EditProfile'
import ViewTop10Button from '../components/profile/ViewUserTop10Button'
import UserTop10 from '../components/profile/UserTop10'

function update () {
  // Check if the auth user has saved a nickname in previous sessions.
  if (window.localStorage.getItem('nickname')) {
    let nickname = window.localStorage.getItem('nickname')

    let data = window.sessionStorage.getItem('data')
    let data2 = JSON.parse(data)

    // Replace the empty sessionstorage nickname with the localstorage nickname.
    if (data2.nickname.length < 1) {
      data2.nickname = nickname
      return data2
    }

    return data2
  }
  let data = window.sessionStorage.getItem('data')
  let data2 = JSON.parse(data)
  return data2
}

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: [update()]
    }
  }

  handleScoreSelect (score) {
    this.setState(prevState => {
      return {
        profile: [update()]
      }
    })
  }

  render () {
    if (window.sessionStorage.getItem('nick')) {
      return (
        <div className="components">
          <EditProfile />
        </div>
      )
    }

    if (window.sessionStorage.getItem('viewtop10')) {
      return (
        <div className="components">
          <UserTop10 />
        </div>
      )
    }

    return (
      <div className="components">
        <h1>Profile</h1>
        <ProfileDetails
          profile={this.state.profile}
          onScoreSelect={this.handleScoreSelect.bind(this)}
        />
        <p><EPB /> <ViewTop10Button /></p>
      </div>
    )
  }
}

export default Profile
