import React from 'react'
import PropTypes from 'prop-types'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

function ProfileTop10List (props) {
  return (
    <table className="table table-hover">
      <caption>Personal Top 10</caption>
      <thead className="thead-light">
        <tr>
          <th scope="col">User</th>
          <th scope="col">Nickname</th>
          <th scope="col">Score</th>
          <th scope="col">Registered</th>
        </tr>
      </thead>
      <tbody>
        {
          props
            .profile.map(score => (
              <tr key={score._id}>
                <th scope="row">{score.user}</th>
                <th scope="row">{score.nickname}</th>
                <td>{score.score} dB</td>
                <td>{score.dateAdded}</td>
              </tr>
            ))
        }
      </tbody>
    </table>
  )
}
ProfileTop10List.propTypes = {
  profile: PropTypes.array.isRequired
}
export default ProfileTop10List
