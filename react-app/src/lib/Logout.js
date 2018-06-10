import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Log from '../img/logout.png'

let createReactClass = require('create-react-class')

var buttonStyle = {
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px'
}

function removeToken () {
  if (window.sessionStorage.getItem('token')) {
    let data = window.sessionStorage.getItem('token')
    if (data !== null) {
      window.sessionStorage.removeItem('token') // Remove auth. user from session.
      window.sessionStorage.removeItem('data') // Remove auth. user's data from session.
      window.location.reload() // Reload window on response, reload triggers redirect to "/" if (sessionStorage.getItem('token') === null)
    }
  }

  if (window.sessionStorage.getItem('guestlogin')) {
    window.sessionStorage.removeItem('guestlogin') // Remove guest from session.
    window.sessionStorage.removeItem('guestdata') // Remove guest's data from session.
    window.location.reload()
  }
}

let Button = createReactClass({
  render: function () {
    return (
      <button
        className='btn btn-default'
        title='LOGOUT'
        style={buttonStyle}
        onClick={removeToken}>Logout</button>
    )
  }
})

class Logout extends Component { // Setup .env variable.
  render () {
    if (window.sessionStorage.getItem('token') || window.sessionStorage.getItem('guestlogin')) {
      return (
        <div className="components">
          <div className="card">
            <img className="card-img-top" src={Log} alt="Logout" />
            <div className="card-body">
              <p>--------------------</p>
              <h3 className="card-title">Logout</h3>
              <p>--------------------</p>
              <Button />
            </div>
          </div>
        </div>
      )
    }
    return (
      <Redirect to="/" />
    )
  }
}

export default Logout
