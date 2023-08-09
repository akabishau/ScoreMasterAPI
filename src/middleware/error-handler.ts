import { Request, Response, NextFunction } from 'express'
import AppError from '../errors/AppError'

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const includeContext = process.env.NODE_ENV === 'development'

  if (err instanceof AppError) {
    err.log()

    const { statusCode, message, context } = err
    const errorResponse = {
      status: 'error',
      statusCode,
      message,
      ...(includeContext && { context })
    }
    return res.status(statusCode).json(errorResponse)
  }

  console.error('Unhandled Error:', err)
  const defaultErrorResponse = {
    status: 'error',
    statusCode: 500,
    message: 'Internal Server Error',
    ...(includeContext && { context: err })
  }
  res.status(500).json(defaultErrorResponse)
}
