import React from 'react'
import { shallow } from 'enzyme'
import ProfileDetails from '../components/ProfileDetails'

let mockScores, wrapper, highScoreSelectFn

beforeEach(() => {
  mockScores = [
    {id: 1, user: 'Mock User 1', nickname: 'bastard', score: '41'}
  ]
  highScoreSelectFn = jest.fn()
  wrapper = shallow(
    <ProfileDetails
      profile={mockScores}
      onScoreSelect={highScoreSelectFn}
    />
  )
})

afterEach(() => {
  highScoreSelectFn.mockReset()
})

it('should render an <tr> element for every profile in `props.scores`', () => {
  expect(wrapper.find('tr').length).toEqual(mockScores.length + 1) // +1 is the tr header.
})

it('should display the user of the profile in each `<tr>` element', () => {
  const firstElement = wrapper.find('tr').at(1)
  expect(firstElement.contains(mockScores[0].user)).toEqual(true)
})

it('should display the nickname of the profile in each `<tr>` element', () => {
  const firstElement = wrapper.find('tr').at(1)
  expect(firstElement.contains(mockScores[0].nickname)).toEqual(true)
})

it('should display the score in each `<tr>` element', () => {
  const firstElement = wrapper.find('tr').at(1)
  expect(firstElement.contains(mockScores[0].score)).toEqual(true)
})

it('should call `props.onScoreSelect` when an <tr> is clicked', () => {
  const firstElement = wrapper.find('tr').at(1) // .at(1) select second tr element.
  // We check that the function has not been called yet
  expect(highScoreSelectFn.mock.calls.length).toEqual(0)
  // We click the <tr>
  firstElement.simulate('click')
  // We check that the function has now been called
  expect(highScoreSelectFn.mock.calls.length).toEqual(1)
  // We check it's been called with the right arguments
  expect(highScoreSelectFn.mock.calls[0][0]).toEqual(mockScores[0])
})
