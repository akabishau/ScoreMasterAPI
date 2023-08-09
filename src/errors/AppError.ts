class AppError extends Error {
  public readonly statusCode: number
  public readonly timestamp: Date
  public readonly context?: any

  // Standardized error codes
  static BAD_REQUEST = 400
  static UNAUTHORIZED = 401
  static FORBIDDEN = 403
  static NOT_FOUND = 404
  static INTERNAL = 500

  static ERROR_TEMPLATE = {
    [AppError.BAD_REQUEST]: 'Bad Request',
    [AppError.UNAUTHORIZED]: 'Unauthorized',
    [AppError.FORBIDDEN]: 'Forbidden',
    [AppError.NOT_FOUND]: 'Not Found',
    [AppError.INTERNAL]: 'Internal Server Error'
  }

  constructor(statusCode: number, message?: string, context?: any) {
    super(message || AppError.ERROR_TEMPLATE[statusCode] || 'Unknown Error')
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.timestamp = new Date()
    this.context = context
  }

  log() {
    console.error(
      `${this.timestamp} - ${this.name}: ${this.statusCode} (${this.message})`
    )

    if (this.context) console.error('Context:', JSON.stringify(this.context))

    console.error('Error Stack:', this.stack)
  }

  static create(statusCode: number, message?: string, context?: any) {
    return new AppError(statusCode, message, context)
  }

  static badRequest(message?: string, context?: any) {
    return new AppError(AppError.BAD_REQUEST, message, context)
  }

  static unauthorized(message?: string, context?: any) {
    return new AppError(AppError.UNAUTHORIZED, message, context)
  }

  static forbidden(message?: string, context?: any) {
    return new AppError(AppError.FORBIDDEN, context)
  }

  static notFound(message?: string, context?: any) {
    return new AppError(AppError.NOT_FOUND, message, context)
  }

  static internal(message?: string) {
    return new AppError(AppError.INTERNAL, message)
  }
}

export default AppError
