import { crud, createFirstSprint } from '../sprint.controllers'
import { isFunction } from 'lodash'

describe('sprint controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = [
      'getOne',
      'getMany',
      'createOne',
      'removeOne',
      'updateOne'
    ]

    crudMethods.forEach(name => expect(isFunction(crud[name])).toBe(true))
  })

  test('has createFirstSprint method', () => {
    expect(isFunction(createFirstSprint)).toBe(true)
  })
})
