import React from 'react'
import Sound from 'react-sound'
import Fart6 from '../../../audio/trump/fantastic.wav'
let createReactClass = require('create-react-class')

let Trump7 = createReactClass({
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

export default Trump7
