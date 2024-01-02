const request = require('supertest')
const app = require('../server')

describe('Server', () => {
  it('should be running', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toEqual(404) // Expect 404 because there's no route handling '/'
  })

  it('should have auth routes', async () => {
    const res = await request(app).post('/api/v1/auth/login')
    expect(res.statusCode).not.toEqual(404)
  })

  it('should have workspaces routes', async () => {
    const res = await request(app).get('/api/v1/workspaces')
    expect(res.statusCode).not.toEqual(404)
  })
})
