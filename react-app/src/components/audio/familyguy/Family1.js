import React from 'react'
import Sound from 'react-sound'
import Fart from '../../../audio/familyguy/Awful.mp3'

let createReactClass = require('create-react-class')

let Family1 = createReactClass({
  render: function () {
    return (
      <Sound
        url={Fart}
        playStatus={Sound.status.PLAYING}
        playFromPosition={300 /* in milliseconds */}
        onLoading={this.handleSongLoading}
        onPlaying={this.handleSongPlaying}
        onFinishedPlaying={this.handleSongFinishedPlaying}
      />
    )
  }
})

export default Family1
