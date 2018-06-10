import React from 'react'
import PropTypes from 'prop-types'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

function SoundList (props) {
  return (
    <table className="table table-hover">
      <thead className="thead-light">
        <tr>
          <th scope="col">Judges</th>
        </tr>
      </thead>
      <tbody>
        {
          props
            .sound.map(option => (
              <tr key={option.id} onClick={(evt) => props.onSoundSelect(option)}>
                <th scope="row">{option.name}</th>
              </tr>
            ))
        }
      </tbody>
    </table>
  )
}
SoundList.propTypes = {
  sound: PropTypes.array.isRequired,
  onSoundSelect: PropTypes.func.isRequired
}
export default SoundList
