const { errorHandler } = require('../errorHandler')

describe('errorHandler Middleware Tests', () => {
  let mockResponse
  let nextFunction

  beforeEach(() => {
    mockResponse = {
      status: jest.fn(function () {
        return this
      }),
      json: jest.fn(),
    }
    nextFunction = jest.fn()
  })

  it('should return 500 status code for generic errors', () => {
    const mockError = { message: 'Generic error' }
    errorHandler(mockError, {}, mockResponse, nextFunction)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'Fail',
      message: 'Generic error',
    })
  })

  it('should return 400 status code for duplication errors', () => {
    const mockError = { code: 11000, keyValue: { email: 'test@example.com' } }
    errorHandler(mockError, {}, mockResponse, nextFunction)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'Fail',
      message: 'email must be unique',
    })
  })

  it('should return 404 status code for ObjectId not found errors', () => {
    const mockRequest = { originalUrl: '/api/v1/users/invalidId' }
    const mockError = { kind: 'ObjectId' }
    errorHandler(mockError, mockRequest, mockResponse, nextFunction)

    expect(mockResponse.status).toHaveBeenCalledWith(404)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'Fail',
      message: 'The /api/v1/users/invalidId is not found because of wrong ID',
    })
  })

  it('should return 400 status code for validation errors', () => {
    const mockError = {
      errors: {
        email: { properties: { message: 'Email is required.' } },
        password: { properties: { message: 'Password is required.' } },
      },
    }
    errorHandler(mockError, {}, mockResponse, nextFunction)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'Fail',
      message: ['Email is required.', 'Password is required.'],
    })
  })
})
