import React from 'react'
let createReactClass = require('create-react-class')

var buttonStyle = {
  backgroundColor: 'red',
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px'
}

function viewSoundOptions () {
  let soundoptions = 'soundoptions'
  window.sessionStorage.setItem('soundoptions', soundoptions)
  window.location.reload() // Reload window on response, reload triggers redirect to "/" if (sessionStorage.getItem('start'))
}

let ViewSoundOptions = createReactClass({
  render: function () {
    return (
      <button
        className='btn btn-default'
        title='Sound Options'
        style={buttonStyle}
        onClick={viewSoundOptions}>Sound Options</button>
    )
  }
})

export default ViewSoundOptions
