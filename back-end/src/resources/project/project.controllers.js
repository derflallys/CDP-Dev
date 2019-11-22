import { crudControllers } from '../../utils/crud'
import { Project } from './project.model'
import { User } from '../user/user.model'
import { initCounterProject } from '../../utils/counter.model'
import { createFirstSprint } from '../sprint/sprint.controllers'

export const crud = crudControllers(Project)

export const addUserOnProject = async (req, res) => {
  try {
    // Retrieve the requested project and user
    const project = await Project.findOne({ _id: req.params.id })
      .lean()
      .exec()
    const user = await User.findOne({ userName: req.params.un })
      .lean()
      .exec()
    if (!project || !user) {
      return res.status(400).end()
    }

    // Update the project by adding the user
    const userRole = {
      user: user._id,
      role: 'DEV'
    }
    const updatedProject = await Project.update(
      { _id: req.params.id },
      { $push: { users: userRole } }
    )
      .lean()
      .exec()
    res.status(200).json(updatedProject)
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getProjectsByUser = async (req, res) => {
  try {
    const doc = await Project.find({})
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).end()
    }
    const id = req.params.id
    const projectUser = []

    doc.forEach(project => {
      console.log(project.createBy)

      if (project.users) {
        if (
          project.users.find(userR => userR.user.toString() === id.toString())
        ) {
          projectUser.push(project)
        }
      }
    })
    res.status(200).json(projectUser)
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const createOneProject = async (req, res) => {
  try {
    const doc = await Project.create({ ...req.body })
    initCounterProject(doc._id)
    createFirstSprint(doc)
    res.status(201).json(doc)
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
