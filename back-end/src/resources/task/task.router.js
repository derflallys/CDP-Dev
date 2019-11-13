import { Router } from 'express'
import controllers from './task.controllers'

const router = Router()

// /api/task

router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)

// /api/task/:id

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

// /api/issue/byissue
router.route('/byissue/:id').get(controllers.getByIssuet)

export default router
