import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Top10 from './lib/Top10'
import Login from './lib/Login'
import Logout from './lib/Logout'
import Home from './lib/Home'
import Game from './lib/Game'
import Header from './lib/Header'
import Profile from './lib/Profile'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  changeState () {
    let data = window.sessionStorage.getItem('token')
    let guest = window.sessionStorage.getItem('guestlogin')

    if (data !== null) { // Auth. user navigation menu.
      return (<Header.HeaderAuth />)
    }

    if (guest) { // Guest navigation menu.
      return (<Header.HeaderGuest />)
    }

    return (<Header.Nav />) // Default navigation menu.
  }

  render () {
    return (
      <BrowserRouter>
        <div className="wrapper">
          {this.changeState()}
          <main className="main">
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/info" component={Top10} />
            <Route path="/game" component={Game} />
            <Route path="/logout" component={Logout} />
            <Route path="/profile" component={Profile} />
          </main>
          <footer className="footer">
            <p>
              <a href="https://www.custer.io">Custer IO</a>
            </p>
          </footer>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
