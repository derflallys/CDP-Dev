import { crudControllers } from '../../utils/crud'
import { Task } from './task.model'
import { Project } from './../project/project.model'
import { uniqBy } from 'lodash'
export const crud = crudControllers(Task)

export const getTasksByDev = async (req, res) => {
  try {
    const tasks = await Task.find({ dev: req.params.id, state: 'DOING' })
      .lean()
      .exec()
    if (!tasks) {
      return res.status(400).end()
    }

    const projectIds = tasks.map(t => t.projectId) // Stores array of ObjectId
    const uniqueProjectIds = uniqBy(projectIds, 'str')
    console.log(uniqueProjectIds)

    const projectTitles = new Map() // Map that stores <String(projectId), projectTitle>

    // Request only for projects that are different
    for (let i = 0; i < uniqueProjectIds.length; i++) {
      const projectId = uniqueProjectIds[i]
      const project = await Project.find({ _id: projectId })
        .lean()
        .exec()
      projectTitles.set(String(projectId), project[0].title)
    }

    // Set titles to all projects
    tasks.forEach(t => {
      t.projectTitle = projectTitles.get(String(t.projectId))
    })

    res.status(200).json(tasks)
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
