import React from 'react'
let createReactClass = require('create-react-class')

var buttonStyle = {
  backgroundColor: 'green',
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px'
}

function forward () {
  let data = {}

  data.score = [] // Will hold highest decibel score the user get per start/stop.

  window.sessionStorage.setItem('guestdata', JSON.stringify(data)) // Store guest's score for the session.

  let guestlogin = 'guestlogin'
  window.sessionStorage.setItem('guestlogin', guestlogin)
  window.location.reload()
}

let GuestLogin = createReactClass({
  render: function () {
    return (
      <button
        className='btn btn-default'
        title='Guest'
        style={buttonStyle}
        onClick={forward}>Guest Login</button>
    )
  }
})

export default GuestLogin
