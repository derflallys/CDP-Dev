import { Router } from 'express'
import controllers from './test.controllers'

const router = Router()

// /api/test

router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)

// /api/test/:id

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
