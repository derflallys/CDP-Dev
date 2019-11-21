import { Router } from 'express'
import { crud } from './task.controllers'

const router = Router()

// /api/task

router
  .route('/')
  .get(crud.getMany)
  .post(crud.createOne)

// /api/task/:id

router
  .route('/:id')
  .get(crud.getOne)
  .put(crud.updateOne)
  .delete(crud.removeOne)

// /api/task/byissue
// router.route('/byissue/:id').get(crud.getByIssue)

// /api/task/bysprint
router.route('/bysprint/:id').get(crud.getBySprint)

export default router
