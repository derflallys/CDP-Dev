import { crudControllers } from '../../utils/crud'
import { Task } from './task.model'
import { Project } from './../project/project.model'
import { uniqBy } from 'lodash'
import { Sprint } from '../sprint/sprint.model'
import { Issue } from '../issue/issue.model'
export const crud = crudControllers(Task)

export const getTasksByDev = async (req, res) => {
  try {
    const tasks = await Task.find({ dev: req.params.id, state: 'DOING' })
      .lean()
      .exec()
    if (!tasks) {
      return res.status(400).end()
    }
    let realtask = []
    for (const task of tasks) {
      const sprint = await Sprint.findOne({ _id: task.sprintId })
      let issueInsert = false
      for (const issue of task.issues) {
        const getIssue = await Issue.findOne({ issueId: issue })
        if (getIssue) {
          issueInsert = true
        }
      }

      if (sprint && issueInsert) {
        realtask.push(task)
      }
    }
    const projectIds = realtask.map(t => t.projectId) // Stores array of ObjectId
    const uniqueProjectIds = uniqBy(projectIds, 'str')
    const projectTitles = new Map() // Map that stores <String(projectId), projectTitle>

    // Request only for projects that are different
    for (let i = 0; i < uniqueProjectIds.length; i++) {
      const projectId = uniqueProjectIds[i]
      const project = await Project.find({ _id: projectId })
        .lean()
        .exec()
      if (project && project.length > 0) {
        projectTitles.set(String(projectId), project[0].title)
      }
    }
    // Set titles to all projects
    realtask.forEach(t => {
      t.projectTitle = projectTitles.get(String(t.projectId))
    })
    realtask = realtask.filter(task => task.projectTitle !== undefined)

    res.status(200).json(realtask)
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
