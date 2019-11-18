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

export const crud = crudControllers(Sprint)
