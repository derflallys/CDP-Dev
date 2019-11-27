import router from '../project.router'

describe('project router', () => {
  test('has crud routes project', () => {
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

  test('has addUser on project route ', () => {
    const routeAddUser = { path: '/user/:id/:un', method: 'post' }
    const match = router.stack.find(
      s =>
        s.route.path === routeAddUser.path &&
        s.route.methods[routeAddUser.method]
    )
    expect(match).toBeTruthy()
  })

  test('has project by user route ', () => {
    const route = { path: '/byuser/:id', method: 'get' }
    const match = router.stack.find(
      s =>
        s.route.path === route.path &&
        s.route.methods[route.method]
    )
    expect(match).toBeTruthy()
  })
})
