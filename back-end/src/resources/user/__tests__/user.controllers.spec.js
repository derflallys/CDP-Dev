import { me, updateMe } from '../user.controllers'
import { isFunction } from 'lodash'

describe('user controllers', () => {
  test('has method get user connected ', () => {
    expect(isFunction(me)).toBe(true)
  })

  test('has method to update user ', () => {
    expect(isFunction(updateMe)).toBe(true)
  })
})
