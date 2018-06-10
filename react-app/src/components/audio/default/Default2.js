import React from 'react'
import Sound from 'react-sound'
import Fart from '../../../audio/general/femalescream.wav'

let createReactClass = require('create-react-class')

let Default2 = createReactClass({
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

export default Default2
