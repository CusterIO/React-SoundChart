import React, { Component } from 'react'
import HighScoreList from '../components/HighScoreList'
require('dotenv').config()
let url = process.env.REACT_APP_SCOREURL

function handleErrors (response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

class Top10 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scores: [
        {_id: 1, user: 'Offline Darth Vader', nickname: 'The Darkside', score: '24', dateAdded: '2018-04-14'},
        {_id: 2, user: 'Offline Yoda', nickname: 'Yoda The', score: '22', dateAdded: '2018-04-14'},
        {_id: 3, user: 'Offline Jedi', nickname: 'The Force', score: '20', dateAdded: '2018-04-14'},
        {_id: 4, user: 'Cant connect to server', nickname: 'Mr Error', score: '50', dateAdded: '2018-04-26'}
      ]
    }
  }

  componentDidMount () {
    fetch(url)
      .then((response) => handleErrors(response))
      .then((response) => {
        console.log('ok')
        let data = response.json()
        return data
      }).then((data) => {
        this.setState({
          scores: data.highscore
        })
      }).catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <div className="components">
        <h1>Top 10 Fart Chart</h1>

        <HighScoreList
          scores={this.state.scores}
        />
      </div>
    )
  }
}

export default Top10
