import { crudControllers } from '../../utils/crud'
import { Project } from './project.model'
import { User } from '../user/user.model'

export const crud = crudControllers(Project)

export const addUserOnProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id })
      .lean()
      .exec()
    const user = await User.findOne({ userName: req.params.un })
      .lean()
      .exec()
    if (!project || !user) {
      return res.status(400).end()
    } else {
      const userRole = {
        user: user._id,
        role: 'DEV'
      }
      project.users.push(userRole)
      res.status(200).json(project)
    }
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
