import React from 'react'
import PropTypes from 'prop-types'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

function ProfileDetails (props) {
  return (
    <table className="table table-hover">
      <caption>Users recent score</caption>
      <thead className="thead-light">
        <tr>
          <th scope="col">User</th>
          <th scope="col">Nickname</th>
          <th scope="col">Score (in DB)</th>
        </tr>
      </thead>
      <tbody>
        {
          props
            .profile.map(score => (
              <tr key={score.id} onClick={(evt) => props.onScoreSelect(score)}>
                <th scope="row">{score.user}</th>
                <th scope="row">{score.nickname}</th>
                <td>{score.score}</td>
              </tr>
            ))
        }
      </tbody>
    </table>
  )
}
ProfileDetails.propTypes = {
  profile: PropTypes.array.isRequired,
  onScoreSelect: PropTypes.func.isRequired
}
export default ProfileDetails
