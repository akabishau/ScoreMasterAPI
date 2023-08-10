import AppError from '../errors/AppError'
import { Request, Response, NextFunction } from 'express'

export default function (req: Request, res: Response, next: NextFunction) {
  const message = `Route Not Found`
  const context = { method: req.method, url: req.originalUrl }
  next(AppError.notFound(message, context))
}
