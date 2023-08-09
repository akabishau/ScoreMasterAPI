import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import AppError from '../errors/AppError'

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    const { statusCode, message, context } = err
    const errorResponse = {
      status: 'error',
      statusCode,
      message,
      ...(context && { context })
    }
    res.status(statusCode).json(errorResponse)
  }

  console.error('Unhandled Error:', err)
  const defaultErrorResponse = {
    status: 'error',
    statusCode: 500,
    message: 'Internal Server Error'
  }
  res.status(500).json(defaultErrorResponse)
}
