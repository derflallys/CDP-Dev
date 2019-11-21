import { getOne, getMany, createOne, updateOne, removeOne } from '../crud'
import { Sprint } from '../../resources/sprint/sprint.model'
import { User } from '../../resources/user/user.model'
import mongoose from 'mongoose'
import { Issue } from '../../resources/issue/issue.model'
import { Project } from '../../resources/project/project.model'
import { Counters } from '../counter.model'

describe('crud controllers', () => {
  describe('getOne', async () => {
    test('find sprint by id project', async () => {
      expect.assertions(2)

      const projectObject = await Project.create({
        title: 'Project'
      })
      const project = projectObject._id


      const t = await Counters.create({
        type: 'Sprint',
        project: project,
        seq: 0
      })


      const sprint = await Sprint.create({
        projectId: project,
        title: 'Sprint',
        startDate: new Date(),
        endDate: new Date()
      })

      const req = {
        params: {
          id: sprint._id
        },
        project: projectObject
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(result) {
          console.log(result.data)
          expect(result.data._id.toString()).toBe(sprint._id.toString())
        }
      }

      await getOne(Sprint)(req, res)
    })

    test('404 if no doc was found', async () => {
      expect.assertions(2)

      const projectObject = await Project.create({
        title: 'Project'
      })
      const project = projectObject._id
      // const project = mongoose.Types.ObjectId()

      const req = {
        params: {
          id: mongoose.Types.ObjectId()
        },
        projectId: {
          _id: project
        }
      }

      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        end() {
          expect(true).toBe(true)
        }
      }

      await getOne(Sprint)(req, res)
    })
  })

  describe('getMany', () => {
    test('finds array of issue by project ', async () => {
      expect.assertions(4)

      const projectObject = await Project.create({
        title: 'Project'
      })
      const project = projectObject._id

      // const project = mongoose.Types.ObjectId()
      await Issue.create([
        {
          projectId: project,
          description: 'QSDLFKQSDLFJ',
          priority: 'LOW',
          state: 'TODO'
        },
        {
          projectId: project,
          description: 'MDLMKGLDS',
          priority: 'LOW',
          state: 'TODO'
        },
        {
          projectId: mongoose.Types.ObjectId(),
          description: 'QSDLFKQSDLFJ',
          priority: 'LOW',
          state: 'TODO'
        }
      ])

      const req = {
        projectId: {
          _id: project
        }
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(result) {
          expect(result.data).toHaveLength(2)
          result.data.forEach(doc =>
            expect(`${doc.projectId}`).toBe(`${project}`)
          )
        }
      }

      await getMany(Issue)(req, res)
    })
  })

  describe('createOne', () => {
    test('creates a new doc', async () => {
      expect.assertions(2)

      const projectObject = await Project.create({
        title: 'Project'
      })
      const project = projectObject._id

      // const project = mongoose.Types.ObjectId()
      const body = {
        projectId: project,
        title: 'Sprint',
        startDate: new Date(),
        endDate: new Date()
      }

      const req = {
        projectId: { _id: project },
        body
      }

      const res = {
        status(status) {
          expect(status).toBe(201)
          return this
        },
        json(results) {
          expect(results.data.title).toBe(body.title)
        }
      }

      await createOne(Sprint)(req, res)
    })
  })

  describe('updateOne', () => {
    test('finds doc by authenticated user and id to update', async () => {
      expect.assertions(3)

      const projectObject = await Project.create({
        title: 'Project'
      })
      const project = projectObject._id

      // const project = mongoose.Types.ObjectId()
      const sprint = await Sprint.create({
        projectId: project,
        title: 'Sprint',
        startDate: new Date(),
        endDate: new Date()
      })
      const update = { title: 'Sprint Update' }

      const req = {
        params: { id: sprint._id },
        projectId: { _id: project },
        body: update
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(results) {
          expect(`${results.data._id}`).toBe(`${sprint._id}`)
          expect(results.data.name).toBe(update.name)
        }
      }

      await updateOne(Sprint)(req, res)
    })

    test('400 if no doc', async () => {
      expect.assertions(2)

      const projectObject = await Project.create({
        title: 'Project'
      })
      const project = projectObject._id

      // const project = mongoose.Types.ObjectId()
      const update = { title: 'Sprint Update' }

      const req = {
        params: { id: mongoose.Types.ObjectId() },
        projectId: { _id: project },
        body: update
      }

      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        end() {
          expect(true).toBe(true)
        }
      }

      await updateOne(Sprint)(req, res)
    })
  })

  describe('removeOne', () => {
    test('first doc by authenticated user and id to remove', async () => {
      expect.assertions(2)

      const projectObject = await Project.create({
        title: 'Project'
      })
      const project = projectObject._id

      // const project = mongoose.Types.ObjectId()
      const issue = await Issue.create({
        projectId: project,
        description: 'QSDLFKQSDLFJ',
        priority: 'LOW',
        state: 'TODO'
      })

      const req = {
        params: { id: issue._id },
        projectId: { _id: project }
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(results) {
          expect(`${results.data._id}`).toBe(`${issue._id}`)
        }
      }

      await removeOne(Issue)(req, res)
    })

    test('400 if no doc', async () => {
      expect.assertions(2)
      // const project = mongoose.Types.ObjectId()

      const projectObject = await Project.create({
        title: 'Project'
      })
      const project = projectObject._id

      const req = {
        params: { id: mongoose.Types.ObjectId() },
        projectId: { _id: project }
      }

      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        end() {
          expect(true).toBe(true)
        }
      }

      await removeOne(Issue)(req, res)
    })
  })
})
