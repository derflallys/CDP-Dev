import { Router } from 'express'
import controllers from './project.controllers'

const router = Router()

// /api/project

router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOneProject)

// /api/project/:id

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
