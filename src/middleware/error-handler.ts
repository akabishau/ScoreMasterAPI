// const { StatusCodes } = require('http-status-codes')
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // simple implementation - add custom error
  console.log('error handler:', err.message)
  const code =
    err.name === 'ValidationError'
      ? StatusCodes.BAD_REQUEST
      : StatusCodes.INTERNAL_SERVER_ERROR
  res.status(code).json({
    error: {
      msg: err.message || 'Something went wrong'
    }
  })
}
