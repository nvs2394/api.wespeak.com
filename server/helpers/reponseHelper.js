const responseSuccess = (statusCode, message, data) => {
  return {
    statusCode,
    message,
    data
  }
}

const responseError = (statusCode, message, error) => {
  return {
    statusCode,
    message,
    error
  }
}

module.exports = {
  responseError,
  responseSuccess
}
