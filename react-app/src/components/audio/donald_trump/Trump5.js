import React from 'react'
import Sound from 'react-sound'
import Fart5 from '../../../audio/trump/theamerican.wav'
let createReactClass = require('create-react-class')

let Trump5 = createReactClass({
  render: function () {
    return (
      <Sound
        url={Fart5}
        playStatus={Sound.status.PLAYING}
        playFromPosition={300 /* in milliseconds */}
        onLoading={this.handleSongLoading}
        onPlaying={this.handleSongPlaying}
        onFinishedPlaying={this.handleSongFinishedPlaying}
      />
    )
  }
})

export default Trump5
