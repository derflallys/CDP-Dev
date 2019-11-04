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

// /api/issue/byproject
router.route('/byproject/:id').get(controllers.getByProject)

// /api/issue/bysprint
router.route('/bysprint/:id').get(controllers.getBySprint)

export default router
