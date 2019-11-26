import { crud, getTasksByDev } from '../task.controllers'
import { isFunction } from 'lodash'

describe('task controllers', () => {
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

  test('has getTasksByDev method', () => {
    expect(isFunction(getTasksByDev)).toBe(true)
  })
})
