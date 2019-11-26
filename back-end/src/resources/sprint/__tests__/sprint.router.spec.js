import router from '../sprint.router'

describe('sprint router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/', method: 'get' },
      { path: '/:id', method: 'get' },
      { path: '/:id', method: 'delete' },
      { path: '/:id', method: 'put' },
      { path: '/', method: 'post' }
    ]

    routes.forEach(route => {
      const match = router.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      expect(match).toBeTruthy()
    })
  })

  test('has sprint by project route ', () => {
    const route = { path: '/byproject/:id', method: 'get' }
    const match = router.stack.find(
      s => s.route.path === route.path && s.route.methods[route.method]
    )
    expect(match).toBeTruthy()
  })
})
