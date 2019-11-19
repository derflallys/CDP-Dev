import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import { connect } from './utils/db'
import { signin, signup, protect } from './utils/auth'
import issueRouter from './resources/issue/issue.router'
import projectRouter from './resources/project/project.router'
import sprintRouter from './resources/sprint/sprint.router'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api', protect)
app.use('/api/issue', issueRouter)
app.use('/api/project', projectRouter)
app.use('/api/sprint', sprintRouter)

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}
