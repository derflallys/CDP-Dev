import { Router } from 'express'
import controllers from './sprint.controllers'

const router = Router()

// /api/sprint

router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)

// /api/sprint/:id

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

// /api/sprint/byproject
router.route('/byproject/:id').get(controllers.getByProject)

export default router
