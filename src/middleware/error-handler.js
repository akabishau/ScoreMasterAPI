const { StatusCodes } = require('http-status-codes')

module.exports = (err, req, res, next) => {
  // simple implementation - add custom error
  console.log('error handler:', err.message)
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: {
      msg: err.message || 'Something went wrong'
    }
  })
}
