import { Router } from 'express'
import { crud, addUserOnProject, createOneProject , getProjectsByUser, getallUsersOnProject } from './project.controllers'

const router = Router()

// /api/project

router
  .route('/')
  .get(crud.getMany)
  .post(createOneProject)

// /api/project/:id

router
  .route('/:id')
  .get(crud.getOne)
  .put(crud.updateOne)
  .delete(crud.removeOne)

// /api/project/user/:id/:user
router.route('/user/:id/:un').post(addUserOnProject)

// /api/project/byuser/:id
router.route('/byuser/:id').get(getProjectsByUser)

// /api/project/users/:id
router.route('/users/:id').get(getallUsersOnProject)



export default router
