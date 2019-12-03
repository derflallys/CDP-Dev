import {
  crud,
  dfgkhdfg,
  addUserOnProject,
  createOneProject,
  getProjectsByUser,
  getallUsersOnProject
} from '../project.controllers'
import { isFunction } from 'lodash'

describe('project controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = ['getMany', 'createOne', 'removeOne', 'updateOne']

    crudMethods.forEach(name => expect(isFunction(crud[name])).toBe(true))
  })

  test('has addUserOnProject', () => {
    expect(isFunction(addUserOnProject)).toBe(true)
  })
  test('has method not found', () => {
    expect(isFunction(dfgkhdfg)).toBe(false)
  })

  test('has getProjectsByUser', () => {
    expect(isFunction(getProjectsByUser)).toBe(true)
  })

  test('has createOneProject', () => {
    expect(isFunction(createOneProject)).toBe(true)
  })

  test('has getallUsersOnProject', () => {
    expect(isFunction(getallUsersOnProject)).toBe(true)
  })
})
