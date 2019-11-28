import request from 'supertest'
import { app } from '../server'
import { User } from '../resources/user/user.model'
import { newToken } from '../utils/auth'
import mongoose from 'mongoose'

describe('API Authentication:', () => {
  let token
  beforeEach(async () => {
    const user = await User.create({
      email: 'a@a.com',
      password: 'hello',
      userName: 'aa'
    })
    token = newToken(user)
  })

  describe('api auth', () => {
    test('api should be locked down', async () => {
      let response = await request(app).get('/api/user')
      expect(response.statusCode).toBe(401)

      response = await request(app).get('/api/project')
      expect(response.statusCode).toBe(401)

      response = await request(app).get('/api/issue')
      expect(response.statusCode).toBe(401)

      response = await request(app).get('/api/sprint')
      expect(response.statusCode).toBe(401)
    })

    test('passes User with JWT', async () => {
      const jwt = `Bearer ${token}`
      const id = mongoose.Types.ObjectId()
      const results = await Promise.all([
        request(app)
          .get('/api/user')
          .set('Authorization', jwt),
        request(app)
          .put(`/api/user/${id}`)
          .set('Authorization', jwt)
      ])

      results.forEach(res => expect(res.statusCode).not.toBe(401))
    })

    test('passes Issue with JWT', async () => {
      const jwt = `Bearer ${token}`
      const id = mongoose.Types.ObjectId()
      const results = await Promise.all([
        request(app)
          .get('/api/issue')
          .set('Authorization', jwt),
        request(app)
          .get(`/api/issue/${id}`)
          .set('Authorization', jwt),
        request(app)
          .post('/api/issue')
          .set('Authorization', jwt),
        request(app)
          .put(`/api/issue/${id}`)
          .set('Authorization', jwt),
        request(app)
          .delete(`/api/issue/${id}`)
          .set('Authorization', jwt)
      ])

      results.forEach(res => expect(res.statusCode).not.toBe(401))
    })

    test('passes Sprint with JWT', async () => {
      const jwt = `Bearer ${token}`
      const id = mongoose.Types.ObjectId()
      const results = await Promise.all([
        request(app)
          .get('/api/sprint')
          .set('Authorization', jwt),
        request(app)
          .get(`/api/sprint/${id}`)
          .set('Authorization', jwt),
        request(app)
          .post('/api/sprint')
          .set('Authorization', jwt),
        request(app)
          .put(`/api/sprint/${id}`)
          .set('Authorization', jwt),
        request(app)
          .delete(`/api/sprint/${id}`)
          .set('Authorization', jwt)
      ])

      results.forEach(res => expect(res.statusCode).not.toBe(401))
    })

    test('passes Project with JWT', async () => {
      const jwt = `Bearer ${token}`
      const id = mongoose.Types.ObjectId()
      const results = await Promise.all([
        request(app)
          .get('/api/project')
          .set('Authorization', jwt),
        request(app)
          .get(`/api/project/${id}`)
          .set('Authorization', jwt),
        request(app)
          .post('/api/project')
          .set('Authorization', jwt),
        request(app)
          .put(`/api/project/${id}`)
          .set('Authorization', jwt),
        request(app)
          .delete(`/api/project/${id}`)
          .set('Authorization', jwt)
      ])

      results.forEach(res => expect(res.statusCode).not.toBe(401))
    })
  })
})
