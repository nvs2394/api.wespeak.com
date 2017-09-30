const responseSuccess = (code, data) => {
  return {
    code,
    data
  }
}

const responseError = (code, message) => {
  return {
    code,
    message
  }
}

module.exports = {
  responseError,
  responseSuccess
}
