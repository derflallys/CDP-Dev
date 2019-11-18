import { crudControllers } from '../../utils/crud'
import { Project } from './project.model'
import { initCounterProject } from '../../utils/counter.model'
import { createFirstSprint } from '../sprint/sprint.controllers'

export const createOneProject = async (req, res) => {
  try {
    const doc = await Project.create({ ...req.body })
    console.log(doc)
    initCounterProject(doc._id)
    createFirstSprint(doc)
    res.status(201).json(doc)
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
export const crud = crudControllers(Project)
