import React from 'react'
import Sound from 'react-sound'
import Fart4 from '../../../audio/general/verygood.wav'
let createReactClass = require('create-react-class')

let Default5 = createReactClass({
  render: function () {
    return (
      <Sound
        url={Fart4}
        playStatus={Sound.status.PLAYING}
        playFromPosition={300 /* in milliseconds */}
        onLoading={this.handleSongLoading}
        onPlaying={this.handleSongPlaying}
        onFinishedPlaying={this.handleSongFinishedPlaying}
      />
    )
  }
})

export default Default5
