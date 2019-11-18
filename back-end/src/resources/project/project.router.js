import { Router } from 'express'
import { crud, addUserOnProject } from './project.controllers'

const router = Router()

// /api/project

router
  .route('/')
  .get(crud.getMany)
  .post(crud.createOneProject)

// /api/project/:id

router
  .route('/:id')
  .get(crud.getOne)
  .put(crud.updateOne)
  .delete(crud.removeOne)

router.route('/user/:id/:un').post(addUserOnProject)

export default router
