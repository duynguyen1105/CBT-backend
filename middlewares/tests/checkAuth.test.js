const request = require('supertest')
const app = require('../../server')

describe('checkAuth Middleware Unauthorized Error Tests', () => {
  it('should return 401 Unauthorized when the token is missing', async () => {
    app.use((req, res, next) => {
      req.header = () => ''
      next()
    })

    const response = await request(app).get('/api/v1/workspaces').expect(401)

    expect(response.body).toHaveProperty('message', 'Unauthorized!')
  })

  it('should return 401 Unauthorized when the token is not prefixed with Bearer', async () => {
    app.use((req, res, next) => {
      req.header = () => 'mockToken'
      next()
    })

    const response = await request(app).get('/api/v1/workspaces').expect(401)

    expect(response.body).toHaveProperty('message', 'Unauthorized!')
  })

  it('should return 401 Unauthorized when the token is invalid', async () => {
    app.use((req, res, next) => {
      req.header = () => 'Bearer invalidToken'
      next()
    })

    const response = await request(app).get('/api/v1/workspaces').expect(401)

    expect(response.body).toHaveProperty('message', 'Unauthorized!')
  })
})
