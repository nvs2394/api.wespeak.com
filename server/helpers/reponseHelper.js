/**
 * 
 * @param {*} statusCode 
 * @param {*} message 
 * @param {*} data 
 */
const responseSuccess = (statusCode, message, data) => {
  return {
    statusCode,
    message,
    data
  }
}

/**
 * 
 * @param {*} statusCode 
 * @param {*} message 
 * @param {*} error 
 */
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
