import React from 'react'
import Errorms from '../img/errorstop.png'
let createReactClass = require('create-react-class')

function ErrorServer (props) {
  return (
    <div className="card">
      <img className="card-img-top" src={Errorms} alt="Errorms" />
      <div className="card-body">
        <p>--------------------</p>
        <h3 className="card-title">Failed to connect to server!</h3>
        <p>--------------------</p>
        <p>Your score wont be saved.</p>
        <OK />
      </div>
    </div>
  )
}

let buttonStyle = {
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px'
}

let OK = createReactClass({
  render: function () {
    return (
      <button
        className='btn btn-default'
        title='OK'
        style={buttonStyle}
        onClick={errormsg}>OK</button>
    )
  }
})

function errormsg () {
  window.sessionStorage.removeItem('errormsg')

  window.location.reload()
}

export default ErrorServer
