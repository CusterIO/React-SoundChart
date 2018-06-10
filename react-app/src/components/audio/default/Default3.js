import React from 'react'
import Sound from 'react-sound'
import Fart3 from '../../../audio/general/youddoit.wav'
let createReactClass = require('create-react-class')

let Default3 = createReactClass({
  render: function () {
    return (
      <Sound
        url={Fart3}
        playStatus={Sound.status.PLAYING}
        playFromPosition={300 /* in milliseconds */}
        onLoading={this.handleSongLoading}
        onPlaying={this.handleSongPlaying}
        onFinishedPlaying={this.handleSongFinishedPlaying}
      />
    )
  }
})

export default Default3
