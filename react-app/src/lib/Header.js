import {Link} from 'react-router-dom'
import React, { Component } from 'react'

class HeaderAuth extends Component {
  constructor (props) {
    super(props)
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true
    }
  }
  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render () {
    const collapsed = this.state.collapsed
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show'
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right'
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container">
            <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className={`${classOne}`} id="navbarResponsive">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                <li className="nav-item"><Link to="/game" className="nav-link">Fart Chart</Link></li>
                <li className="nav-item"><Link to="/profile" className="nav-link">Profile</Link></li>
                <li className="nav-item"><Link to="/logout" className="nav-link">Logout</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

class Nav extends Component {
  constructor (props) {
    super(props)
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true
    }
  }
  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render () {
    const collapsed = this.state.collapsed
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show'
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right'
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container">
            <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className={`${classOne}`} id="navbarResponsive">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                <li className="nav-item"><Link to="/info" className="nav-link">Top10</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

class HeaderGuest extends Component {
  constructor (props) {
    super(props)
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true
    }
  }
  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render () {
    const collapsed = this.state.collapsed
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show'
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right'
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container">
            <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className={`${classOne}`} id="navbarResponsive">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item"><Link to="/game" className="nav-link">Fart Chart</Link></li>
                <li className="nav-item"><Link to="/logout" className="nav-link">Logout</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default {HeaderAuth, HeaderGuest, Nav}
