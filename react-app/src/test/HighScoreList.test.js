import React from 'react'
import { shallow } from 'enzyme'
import HighScoreList from '../components/HighScoreList'

let mockScores, wrapper

beforeEach(() => {
  mockScores = [
    {_id: 1, user: 'Mock User 1', nickname: 'mocker', score: '234'},
    {_id: 2, user: 'Mock User 2', nickname: 'tocker', score: '654'},
    {_id: 3, user: 'Mock User 3', nickname: 'pocker', score: '265'}
  ]
  wrapper = shallow(
    <HighScoreList
      scores={mockScores}
    />
  )
})

it('should render an <tr> element for every highscore in `props.scores`', () => {
  expect(wrapper.find('tr').length).toEqual(mockScores.length + 1) // +1 stands for the tr header.
})

it('should display the user of the highscore in each `<tr>` element', () => {
  const firstElement = wrapper.find('tr').at(1)
  expect(firstElement.contains(mockScores[0].user)).toEqual(true)
})

it('should display the nickname of the highscore in each `<tr>` element', () => {
  const firstElement = wrapper.find('tr').at(1)
  expect(firstElement.contains(mockScores[0].nickname)).toEqual(true)
})

it('should display the score in each `<tr>` element', () => {
  const firstElement = wrapper.find('tr').at(1)
  expect(firstElement.contains(mockScores[0].score)).toEqual(true)
})
