import { Router } from 'express'
import { me, updateMe } from './user.controllers'
import {crud} from "../task/task.controllers";

const router = Router()

// api/user

router
    .route('/')
    .get(me)
    .post(updateMe)


export default router
