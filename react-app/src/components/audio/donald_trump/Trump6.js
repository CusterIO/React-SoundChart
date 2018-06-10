import React from 'react'
import Sound from 'react-sound'
import Fart6 from '../../../audio/trump/ivebeen.wav'
let createReactClass = require('create-react-class')

let Trump6 = createReactClass({
  render: function () {
    return (
      <Sound
        url={Fart6}
        playStatus={Sound.status.PLAYING}
        playFromPosition={300 /* in milliseconds */}
        onLoading={this.handleSongLoading}
        onPlaying={this.handleSongPlaying}
        onFinishedPlaying={this.handleSongFinishedPlaying}
      />
    )
  }
})

export default Trump6
