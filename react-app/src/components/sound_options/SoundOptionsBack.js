import React from 'react'
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

function back () {
  window.sessionStorage.removeItem('soundoptions')
  window.location.reload()
}

let soundback = createReactClass({
  render: function () {
    return (
      <button
        className='btn btn-default'
        title='Confirm'
        style={buttonStyle}
        onClick={back}>Confirm</button>
    )
  }
})

export default soundback
