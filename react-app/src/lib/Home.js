import React, { Component } from 'react'
import Info from '../img/fart.png'

class Home extends Component {
  render () {
    return (
      <div className="components">
        <div className="card">
          <img className="card-img-top" src={Info} alt="Info" />
          <div className="card-body">
            <p>--------------------</p>
            <h3 className="card-title">User Guide</h3>
            <p>--------------------</p>
            <p>Place your phone/microphone at a fixed location close to sound source.</p>
            <p>Start measurement. Stop measurement when done.</p>
            <p>DISCLAIMERS!</p>
            <p>All movement of the phone while measuring will affect the result.</p>
            <p>Avoid measuring outdoors, wind have a big impact on the result.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
