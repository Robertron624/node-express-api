function logErrors (error, req, res, next) {
  console.error("ERROR -> ", error)
  next(error)
}

function errorHandler (err, req, res, next) {
  res.status(500).json({
    error: err.message,
    errorStack: err.stack
  })
}

function boomErrorHandler (err, req, res, next) {

  if(err.isBoom) {
    const {output}  = err
    res.status(output.statusCode).json(output.payload)
  }
  else {
    next(err)
  }
}

export {logErrors, errorHandler, boomErrorHandler}
