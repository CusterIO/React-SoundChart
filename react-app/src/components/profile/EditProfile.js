import React from 'react'
import Namepic from '../../img/nickname.png'

class NickNameForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()

    if (this.state.value.length >= 1) { // Nicknames with atleast 1 character will be stored.
      let data = window.sessionStorage.getItem('data') // Store the nickname.
      let data2 = JSON.parse(data)
      data2.nickname = this.state.value

      // Local Storage
      window.localStorage.setItem('nickname', this.state.value)
      // Session Storage
      window.sessionStorage.setItem('data', JSON.stringify(data2)) // Place it back in sessionstorage.
    }

    back2profile()
  }

  render () {
    return (
      <div className="card">
        <img className="card-img-top" src={Namepic} alt="Nickname" />
        <div className="card-body">
          <p>--------------------</p>
          <h3 className="card-title">Add a nickname</h3>
          <p>--------------------</p>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <p>--------------------</p>
            <input type="submit" value="Submit" className='btn btn-default' style={buttonStyle} />
          </form>
        </div>
      </div>
    )
  }
}

let buttonStyle = {
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px'
}

function back2profile () {
  window.sessionStorage.removeItem('nick')

  window.location.reload()
}

export default NickNameForm
