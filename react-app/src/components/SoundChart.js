import React, { Component } from 'react'
import Logo from '../img/high.png'
// Default Audio Files
import Default1 from './audio/default/Default1'
import Default2 from './audio/default/Default2'
import Default3 from './audio/default/Default3'
import Default4 from './audio/default/Default4'
import Default5 from './audio/default/Default5'
import Default6 from './audio/default/Default6'
// Donald Trump Audio Files
import Trump1 from './audio/donald_trump/Trump1'
import Trump2 from './audio/donald_trump/Trump2'
import Trump3 from './audio/donald_trump/Trump3'
import Trump4 from './audio/donald_trump/Trump4'
import Trump5 from './audio/donald_trump/Trump5'
import Trump6 from './audio/donald_trump/Trump6'
import Trump7 from './audio/donald_trump/Trump7'
// Duke Nuke Em Audio Files
import Duke1 from './audio/dukenukem/Duke1'
import Duke2 from './audio/dukenukem/Duke2'
import Duke3 from './audio/dukenukem/Duke3'
import Duke4 from './audio/dukenukem/Duke4'
import Duke5 from './audio/dukenukem/Duke5'
import Duke6 from './audio/dukenukem/Duke6'
import Duke7 from './audio/dukenukem/Duke7'
// Family Guy Audio Files
import Family1 from './audio/familyguy/Family1'
import Family2 from './audio/familyguy/Family2'
import Family3 from './audio/familyguy/Family3'
import Family4 from './audio/familyguy/Family4'
import Family5 from './audio/familyguy/Family5'
import Family6 from './audio/familyguy/Family6'

require('dotenv').config()
let createReactClass = require('create-react-class')

class Guest extends Component { // Logged in as guest. Only default sound available and no save button.
  render () {
    return (
      <div className="components">
        <div className="card">
          <img className="card-img-top" src={Logo} alt="Highscore" />
          <div className="card-body">
            <p>--------------------</p>
            <h3 className="card-title">{score()} DB</h3>
            {defaultSound()}
            <p>--------------------</p>
            <ButtonSound />
            <p>--------------------</p>
            <ButtonBack />
          </div>
        </div>
      </div>
    )
  }
}

class Default extends Component { // Default sound
  render () {
    return (
      <div className="components">
        <div className="card">
          <img className="card-img-top" src={Logo} alt="Highscore" />
          <div className="card-body">
            <p>--------------------</p>
            <h3 className="card-title">{score()} DB</h3>
            {defaultSound()}
            <p>--------------------</p>
            <ButtonSound />
            <p>--------------------</p>
            <Button /> <ButtonBack />
          </div>
        </div>
      </div>
    )
  }
}

class Donald extends Component { // Default sound
  render () {
    return (
      <div className="components">
        <div className="card">
          <img className="card-img-top" src={Logo} alt="Highscore" />
          <div className="card-body">
            <p>--------------------</p>
            <h3 className="card-title">{score()} DB</h3>
            {trumpSound()}
            <p>--------------------</p>
            <ButtonSound />
            <p>--------------------</p>
            <Button /> <ButtonBack />
          </div>
        </div>
      </div>
    )
  }
}

class Family extends Component { // Family Guy sound
  render () {
    return (
      <div className="components">
        <div className="card">
          <img className="card-img-top" src={Logo} alt="Highscore" />
          <div className="card-body">
            <p>--------------------</p>
            <h3 className="card-title">{score()} DB</h3>
            {familySound()}
            <p>--------------------</p>
            <ButtonSound />
            <p>--------------------</p>
            <Button /> <ButtonBack />
          </div>
        </div>
      </div>
    )
  }
}

class Duke extends Component { // Duke sound
  render () {
    return (
      <div className="components">
        <div className="card">
          <img className="card-img-top" src={Logo} alt="Highscore" />
          <div className="card-body">
            <p>--------------------</p>
            <h3 className="card-title">{score()} DB</h3>
            {dukeSound()}
            <p>--------------------</p>
            <ButtonSound />
            <p>--------------------</p>
            <Button /> <ButtonBack />
          </div>
        </div>
      </div>
    )
  }
}

function defaultSound () {
  let data = window.sessionStorage.getItem('data') !== null ? window.sessionStorage.getItem('data') : window.sessionStorage.getItem('guestdata') // If else, if true return auth. user data. Else return guest data.
  let data2 = JSON.parse(data)

  if (data2.score <= 35 || data2.score === null) {
    return <Default6 />
  }

  if (data2.score > 35 && data2.score <= 40) {
    return <Default1 />
  }

  if (data2.score > 40 && data2.score <= 45) {
    return <Default3 />
  }

  if (data2.score > 45 && data2.score <= 50) {
    return <Default5 />
  }

  if (data2.score > 50 && data2.score <= 55) {
    return <Default4 />
  }

  if (data2.score > 55 && data2.score <= 95) {
    return <Default2 />
  }
}

function trumpSound () {
  let data = window.sessionStorage.getItem('data')
  let data2 = JSON.parse(data)

  if (data2.score <= 35 || data2.score === null) {
    return <Trump2 />
  }

  if (data2.score > 35 && data2.score <= 40) {
    return <Trump3 />
  }

  if (data2.score > 40 && data2.score <= 45) {
    return <Trump1 />
  }

  if (data2.score > 45 && data2.score <= 50) {
    return <Trump4 />
  }

  if (data2.score > 50 && data2.score <= 55) {
    return <Trump6 />
  }

  if (data2.score > 55 && data2.score <= 60) {
    return <Trump7 />
  }

  if (data2.score > 60 && data2.score <= 95) {
    return <Trump5 />
  }
}

function dukeSound () {
  let data = window.sessionStorage.getItem('data')
  let data2 = JSON.parse(data)

  if (data2.score <= 35 || data2.score === null) {
    return <Duke1 />
  }

  if (data2.score > 35 && data2.score <= 40) {
    return <Duke2 />
  }

  if (data2.score > 40 && data2.score <= 45) {
    return <Duke7 />
  }

  if (data2.score > 45 && data2.score <= 50) {
    return <Duke4 />
  }

  if (data2.score > 50 && data2.score <= 55) {
    return <Duke3 />
  }

  if (data2.score > 55 && data2.score <= 60) {
    return <Duke5 />
  }

  if (data2.score > 60 && data2.score <= 95) {
    return <Duke6 />
  }
}

function familySound () {
  let data = window.sessionStorage.getItem('data')
  let data2 = JSON.parse(data)

  if (data2.score <= 35 || data2.score === null) {
    return <Family1 />
  }

  if (data2.score > 35 && data2.score <= 40) {
    return <Family2 />
  }

  if (data2.score > 40 && data2.score <= 45) {
    return <Family3 />
  }

  if (data2.score > 45 && data2.score <= 50) {
    return <Family4 />
  }

  if (data2.score > 50 && data2.score <= 55) {
    return <Family5 />
  }

  if (data2.score > 55 && data2.score <= 95) {
    return <Family6 />
  }
}

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

let url = process.env.REACT_APP_URL
// Signature = 'some random signature'
function save () { // Works, express server receives post.
  let data = score()
  if (data >= 10) { // Only send score to express server if its above 10DB.
    fetch(url, {
      method: 'POST',
      headers: {
        Signature: 'random',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstParam: update() // Update contains the players result.
      })
    }).then((response) => handleErrors(response))
      .then((response) => {
        console.log('ok')

        window.sessionStorage.removeItem('save')
        window.location.reload()
      }).catch((error) => {
        console.log(error)
        window.sessionStorage.removeItem('save')

        let errormsg = 'errorholder'
        window.sessionStorage.setItem('errormsg', errormsg) // Add error session.
        window.location.reload()
      })
  } else { // If the user's score is lower than 10 DB - reload fart chart without saving to express server.
    window.sessionStorage.removeItem('save')
    window.location.reload()
  }
}

function handleErrors (response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

function back () {
  window.sessionStorage.removeItem('save')
  window.location.reload()
}

function sound () {
  window.location.reload()
}

function update () {
  let data = window.sessionStorage.getItem('data')
  let data2 = JSON.parse(data)
  return data2
}

function score () {
  if (window.sessionStorage.getItem('guestdata')) { // Guest score.
    let data = window.sessionStorage.getItem('guestdata')
    let data2 = JSON.parse(data)
    return data2.score
  }
  // Auth. user's score.
  let data = window.sessionStorage.getItem('data')
  let data2 = JSON.parse(data)
  return data2.score
}

let Button = createReactClass({
  render: function () {
    return (
      <button
        className='btn btn-default'
        title='SAVE'
        style={buttonStyle}
        onClick={save}>SAVE</button>
    )
  }
})

let ButtonBack = createReactClass({
  render: function () {
    return (
      <button
        className='btn btn-default'
        title='BACK'
        style={buttonStyle}
        onClick={back}>BACK</button>
    )
  }
})

let ButtonSound = createReactClass({
  render: function () {
    return (
      <button
        className='btn btn-default'
        title='REPEAT SOUND'
        style={buttonStyle}
        onClick={sound}>REPEAT SOUND</button>
    )
  }
})

export default {Guest, Default, Donald, Family, Duke}
