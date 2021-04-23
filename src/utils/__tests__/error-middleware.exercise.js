// Testing Middleware

import {UnauthorizedError} from 'express-jwt'
import errorMiddleware from '../error-middleware'

const buildRes = (overrides) => {
  const res = {
    json: jest.fn(() => res),
    status: jest.fn(() => res),
    ...overrides,
  }
  return res
}

test('response to 401 unauthorized error', () => {
  const req = {}
  const next = jest.fn()

  const code = 'some_error_code'
  const message = 'Some error message'
  const error = new UnauthorizedError(code, {
    message,
  })
  const res = buildRes()

  errorMiddleware(error, req, res, next)

  expect(next).not.toHaveBeenCalled()
  expect(res.status).toBeCalledTimes(1)
  expect(res.status).toBeCalledWith(401)
  expect(res.json).toBeCalledWith({
    code: error.code,
    message: error.message,
  })
})

// 🐨 Write a test for the headersSent case
test('Call next function when res.headerSent', () => {
  const req = {}
  const next = jest.fn()

  const res = buildRes({headersSent: true})
  const randomError = {code: 'blah'}
  errorMiddleware(randomError, req, res, next)
  expect(next).toHaveBeenCalledTimes(1)
  expect(next).toHaveBeenCalledWith(randomError)
  // expect(res.status).not.toHaveBeenCalled()
  // expect(res.json).not.toHaveBeenCalled()
})

// 🐨 Write a test for the else case (responds with a 500)
test('Get 500 error code', () => {
  const req = {}
  const next = jest.fn()
  const res = buildRes()
  const randomError = {message: 'other error -not 401'}

  errorMiddleware(randomError, req, res, next)
  expect(next).not.toHaveBeenCalled()
  expect(res.status).toBeCalledTimes(1)
  expect(res.status).toBeCalledWith(500)
  expect(res.json).toBeCalledWith({
    message: randomError.message,
  })
})
