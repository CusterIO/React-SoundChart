import React, { Component } from 'react'
import ErrorBoundary from '../ErrorBoundary'
import SoundList from './SoundList'
import BackButton from './SoundOptionsBack'

import Judge from '../../img/judge.jpg'

class SoundOptions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedSound: [{id: 1, name: 'Default'}],
      sound: [
        {id: 1, name: 'Default'},
        {id: 2, name: 'Donald Trump'},
        {id: 3, name: 'Family Guy'},
        {id: 4, name: 'Duke Nukem'}
      ]
    }
  }

  handleSoundSelect (sound) {
    this.setState(prevState => {
      prevState.selectedSound = [sound] // Replace previous selectedSound.
      return {
        selectedSound: prevState.selectedSound
      }
    })
  }

  showSoundSelect () {
    if (this.state.selectedSound.length > 0) {
      let judge = `${this.state.selectedSound[0].id}` // The id of the chosen judge.
      console.log(judge)
      window.sessionStorage.setItem('judge', JSON.stringify(judge)) // Place the judge id in sessionstorage.
      return `${this.state.selectedSound[0].name}`
    }
    return this.state.selectedSound
  }

  render () {
    return (
      <div className="card">
        <img className="card-img-top" src={Judge} alt="Judge" />
        <div className="card-body">
          <p>--------------------</p>
          <p className="card-title">You have selected: <b>{this.showSoundSelect()}</b></p>
          <p>--------------------</p>
          <ErrorBoundary>
            <SoundList
              sound={this.state.sound}
              onSoundSelect={this.handleSoundSelect.bind(this)}
            />
          </ErrorBoundary>
          <BackButton />
        </div>
      </div>
    )
  }
}

export default SoundOptions
