import React from 'react'
import Sound from 'react-sound'
import Fart2 from '../../../audio/trump/idontthinkso.wav'
let createReactClass = require('create-react-class')

let Trump3 = createReactClass({
  render: function () {
    return (
      <Sound
        url={Fart2}
        playStatus={Sound.status.PLAYING}
        playFromPosition={300 /* in milliseconds */}
        onLoading={this.handleSongLoading}
        onPlaying={this.handleSongPlaying}
        onFinishedPlaying={this.handleSongFinishedPlaying}
      />
    )
  }
})

export default Trump3
