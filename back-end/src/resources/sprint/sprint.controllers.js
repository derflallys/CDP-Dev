import { crudControllers } from '../../utils/crud'
import { Sprint } from './sprint.model'
export const createFirstSprint = function(project) {
  const endDate = new Date()
  const sprintDuration = 10
  endDate.setDate(new Date(project.createdAt).getDate() + sprintDuration)
  const sprint0 = new Sprint({
    projectId: project._id,
    title: 'Sprint',
    startDate: project.createdAt,
    endDate: endDate
  })
  Sprint.create(sprint0)
}

export const getNextSprint = async (req, res) => {
  try {
    const currentSprint = await Sprint.findOne({ _id: req.params.id })
      .lean()
      .exec()

    if (!currentSprint) {
      return res.status(400).end()
    }
    const allSprint = await Sprint.find({
      projectId: currentSprint.projectId
    })
      .lean()
      .exec()

    if (!allSprint) {
      return res.status(400).end()
    }

    let nextSprint = null
    if (allSprint.find(sprint => sprint.sprintId > currentSprint.sprintId)) {
      nextSprint = allSprint.filter(
        sprint => sprint.sprintId > currentSprint.sprintId
      )[0]
    } else {
      const endDate = new Date()
      const sprintDuration = 10
      endDate.setDate(
        new Date(currentSprint.endDate).getDate() + sprintDuration
      )
      const sprintNext = new Sprint({
        projectId: currentSprint.projectId,
        title: 'Sprint',
        startDate: currentSprint.endDate,
        endDate: endDate
      })
      nextSprint = await Sprint.create(sprintNext)
    }

    if (!nextSprint) {
      return res.status(400).end()
    }

    res.status(200).json(nextSprint)
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const crud = crudControllers(Sprint)
