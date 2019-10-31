import { Router } from 'express'
import controllers from './issue.controllers'

const router = Router()

// /api/issue

router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)

// /api/issue/:id

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
