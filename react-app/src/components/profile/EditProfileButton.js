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

function addN () {
  let nickN = 'starting the nickname'
  window.sessionStorage.setItem('nick', nickN)
  window.location.reload() // Reload window on response, reload triggers redirect to "/" if (sessionStorage.getItem('start'))
}

let EditP = createReactClass({
  render: function () {
    return (
      <button
        className='btn btn-default'
        title='NickName'
        style={buttonStyle}
        onClick={addN}>Add Nickname</button>
    )
  }
})

export default EditP
