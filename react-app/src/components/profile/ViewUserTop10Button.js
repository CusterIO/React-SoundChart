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

function addTop10 () {
  let viewtop10 = 'viewtop10'
  window.sessionStorage.setItem('viewtop10', viewtop10)
  window.location.reload() // Reload window on response, reload triggers redirect to "/" if (sessionStorage.getItem('start'))
}

let ViewTop10 = createReactClass({
  render: function () {
    return (
      <button
        className='btn btn-default'
        title='Top10'
        style={buttonStyle}
        onClick={addTop10}>Top 10 Scores</button>
    )
  }
})

export default ViewTop10
