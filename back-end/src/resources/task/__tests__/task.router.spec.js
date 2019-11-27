import router from '../task.router'

describe('task router', () => {
  test('has crud routes task', () => {
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

  test('has task by sprint route ', () => {
    const routeAddUser = { path: '/bysprint/:id', method: 'get' }
    const match = router.stack.find(
      s =>
        s.route.path === routeAddUser.path &&
        s.route.methods[routeAddUser.method]
    )
    expect(match).toBeTruthy()
  })

  test('has task by user route ', () => {
    const route = { path: '/byuser/:id', method: 'get' }
    const match = router.stack.find(
      s => s.route.path === route.path && s.route.methods[route.method]
    )
    expect(match).toBeTruthy()
  })
})
