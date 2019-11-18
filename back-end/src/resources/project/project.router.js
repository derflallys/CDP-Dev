import { Router } from 'express'
import { crud, createOneProject } from './project.controllers'

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

export default router
