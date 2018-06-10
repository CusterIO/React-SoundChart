import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import SoundChart from '../components/SoundChart'
import ErrorServer from '../components/ErrorServer'
import SoundOptions from '../components/sound_options/SoundOptions'
import SoundOptionsButton from '../components/sound_options/SoundOptionsButton'

import Recording from '../img/recording.png'
import Fart from '../img/fart.png'

// ------------ start decibel-meter --------------------------------- //
// ------------ https://www.npmjs.com/package/decibel-meter --------- //
import DecibelMeter from 'decibel-meter' // Import DecibelMeter as ES6 module

const meter = new DecibelMeter('unique-id') // Create a decibel meter

let decibelData = [-99] // Contains decibel values. Default is -99 which results in 1 dB. Used to avoid errors caused by mute mic.

meter.listenTo(0, (dB, percent, value) => dB > -90 ? decibelData.push(dB) : null) // Connect to a source, add a 'sample' event listener, and start listening to the connected source.

// ------------ end decibel-meter ----------------------------------- //
// meter.disconnect() // returns Promise // Disconnect from the audio source entirely
let createReactClass = require('create-react-class')
require('dotenv').config()

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

function start () {
  let start = 'starting the stop'
  window.sessionStorage.setItem('start', start)
  window.location.reload() // Reload window on response, reload triggers redirect to "/" if (sessionStorage.getItem('start'))
  meter.listen() // Starts the decibel-meter."sample" callback set will now receive data
}

let Button = createReactClass({
  render: function () {
    return (
      <button
        className='btn btn-default'
        title='START'
        style={buttonStyle}
        onClick={start}>START</button>
    )
  }
})
/**
 * returns the value of a number rounded to the nearest integer.
 * @param {*} number
 * @param {*} precision
 */
function precisionRound (number, precision) {
  let factor = Math.pow(10, precision)
  return Math.round(number * factor) / factor
}

function stop () {
  window.sessionStorage.removeItem('start') // Remove start session.
  meter.stopListening() // Stop listening to audio source
  decibelData.sort(function (a, b) { return b - a }) // Sort the numbers in the array in descending order

  let data = window.sessionStorage.getItem('guestdata') ? window.sessionStorage.getItem('guestdata') : window.sessionStorage.getItem('data') // Store the highest score.
  let data2 = JSON.parse(data)
  data2.score = precisionRound((100 + decibelData[0]), 1) // Decibel meter start at -100 db. Registered decibel moves towards 0 the higher it is.

  window.sessionStorage.getItem('guestdata') ? window.sessionStorage.setItem('guestdata', JSON.stringify(data2)) : window.sessionStorage.setItem('data', JSON.stringify(data2)) // Place it back in sessionstorage.
  decibelData = [] // Reset the decibel data.

  let save = 'saveholder'
  window.sessionStorage.setItem('save', save) // Add save session.
  window.location.reload() // Reload window on response, reload triggers redirect to "/" if (sessionStorage.getItem('save'))
}

let Button2 = createReactClass({
  render: function () {
    return (
      <button
        className='btn btn-default'
        title='STOP'
        style={buttonStyle}
        onClick={stop}>STOP</button>
    )
  }
})

function whichJudge () {
  if (window.sessionStorage.getItem('judge')) {
    let judge = window.sessionStorage.getItem('judge') // Get the judge id
    let judge2 = JSON.parse(judge)
    return Number(judge2) // Convert judge id: from string to number.
  } else {
    return 1 // Default sound
  }
}

class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      playsound: false
    }
  }

  componentDidMount () {
    if (window.sessionStorage.getItem('save')) {
      this.setState(prevState => {
        return {
          playsound: true
        }
      })
    }
  }

  changeState () {
    let guest = window.sessionStorage.getItem('guestlogin')

    if (guest) { // Guest sound.
      return (<SoundChart.Guest />)
    }
    if (whichJudge() === 1) { // Deafult sound.
      return (<SoundChart.Default />)
    }
    if (whichJudge() === 2) { // Donald trump sound.
      return (<SoundChart.Donald />)
    }
    if (whichJudge() === 3) { // Family guy sound.
      return (<SoundChart.Family />)
    }
    if (whichJudge() === 4) { // Duke Nukem sound.
      return (<SoundChart.Duke />)
    }
    return (<SoundChart.Default />) // Something went wrong and default sound is presented.
  }

  render () {
    if (window.sessionStorage.getItem('soundoptions')) {
      return (
        <div className="components">
          <SoundOptions />
        </div>
      )
    }

    if (this.state.playsound) {
      return (
        <div className="components">
          {this.changeState()}
        </div>
      )
    }

    if (window.sessionStorage.getItem('errormsg')) {
      return (
        <div className="components">
          <ErrorServer />
        </div>
      )
    }

    if (window.sessionStorage.getItem('start')) {
      return (
        <div className="components">
          <div className="card">
            <img className="card-img-top" src={Recording} alt="Recording" />
            <div className="card-body">
              <p>--------------------</p>
              <h3 className="card-title">RECORDING</h3>
              <p>--------------------</p>
              <Button2 />
            </div>
          </div>
        </div>
      )
    }

    if (window.sessionStorage.getItem('token')) { // Auth. user options.
      return (
        <div className="components">
          <div className="card">
            <img className="card-img-top" src={Fart} alt="Fart" />
            <div className="card-body">
              <p>--------------------</p>
              <h3 className="card-title">Fart Chart</h3>
              <p>--------------------</p>
              <SoundOptionsButton />
              <p>--------------------</p>
              <Button />
            </div>
          </div>
        </div>
      )
    }
    if (window.sessionStorage.getItem('guestlogin')) { // Guest options.
      return (
        <div className="components">
          <div className="card">
            <img className="card-img-top" src={Fart} alt="Fart" />
            <div className="card-body">
              <p>--------------------</p>
              <h3 className="card-title">Fart Chart</h3>
              <p><b>Guest Mode</b></p>
              <p>--------------------</p>
              <p>Limited Version!</p>
              <p><b>Login</b> to access all features.</p>
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

export default Game
