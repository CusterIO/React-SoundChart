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
  window.sessionStorage.removeItem('viewtop10')
  window.location.reload()
}

let top10back = createReactClass({
  render: function () {
    return (
      <button
        className='btn btn-default'
        title='NickName'
        style={buttonStyle}
        onClick={back}>Back</button>
    )
  }
})

export default top10back
