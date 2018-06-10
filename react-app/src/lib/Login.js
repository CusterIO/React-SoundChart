import React, { Component } from 'react'
import FacebookLoginWithButton from 'react-facebook-login'
import { Redirect } from 'react-router-dom'
import LogIn from '../img/login.png'
import GuestButton from '../components/GuestButton'

const responseFacebook = (response) => {
  if (response.accessToken) {
    let data = {}

    data.user = response.name
    data.id = response.id
    data.score = [] // Will hold highest decibel score the user get per start/stop.
    data.nickname = '' // Create nickname with empty string to avoid issues when storing to database.

    window.sessionStorage.setItem('data', JSON.stringify(data)) // Store name and id for game app. Will add score to data in the future.

    window.sessionStorage.setItem('token', response.accessToken) // Works is in session store.

    window.location.reload() // Reload window on response, reload triggers redirect to "/" if (sessionStorage.getItem('token'))
  }
}

class Login extends Component { // Setup .env variable.
  render () {
    if (window.sessionStorage.getItem('token')) {
      return (
        <Redirect to="/profile" />
      )
    }
    if (window.sessionStorage.getItem('guestlogin')) {
      return (
        <Redirect to="/game" />
      )
    }
    return (
      <div className="components">
        <div className="card">
          <img className="card-img-top" src={LogIn} alt="Login" />
          <div className="card-body">
            <p>--------------------</p>
            <h3 className="card-title">Login</h3>
            <p>--------------------</p>
            <FacebookLoginWithButton
              appId={process.env.REACT_APP_FBID}
              autoLoad
              callback={responseFacebook}
              icon="fa-facebook"
            />
            <p>--------------------</p>
            <GuestButton />
          </div>
        </div>
      </div>
    )
  }
}

export default Login
