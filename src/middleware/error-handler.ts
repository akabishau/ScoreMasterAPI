import { Request, Response, NextFunction } from 'express'
import AppError from '../errors/AppError'

const includeContext = process.env.NODE_ENV === 'development'

function handleValidationErrors(errors: any) {
  const validationErrors = Object.keys(errors.errors).map(key => ({
    field: key,
    message: errors.errors[key].message
  }))

  return {
    status: 'error',
    statusCode: AppError.BAD_REQUEST,
    message: 'Validation error',
    errors: validationErrors,
    ...(includeContext && { context: errors })
  }
}

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
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

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    console.error('Validation Errors:', err)
    const validationErrorResponse = handleValidationErrors(err)
    return res.status(AppError.BAD_REQUEST).json(validationErrorResponse)
  }

  console.error('Unhandled Error:', err)
  const defaultErrorResponse = {
    status: 'error',
    statusCode: AppError.INTERNAL,
    message: 'Internal Server Error',
    ...(includeContext && { context: err })
  }
  res.status(AppError.INTERNAL).json(defaultErrorResponse)
}
