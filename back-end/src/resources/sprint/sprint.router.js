import { Router } from 'express'
import { crud } from './sprint.controllers'

const router = Router()

// /api/sprint

router
  .route('/')
  .get(crud.getMany)
  .post(crud.createOne)

// /api/sprint/:id

router
  .route('/:id')
  .get(crud.getOne)
  .put(crud.updateOne)
  .delete(crud.removeOne)

// /api/sprint/byproject
router.route('/byproject/:id').get(crud.getByProject)

export default router
