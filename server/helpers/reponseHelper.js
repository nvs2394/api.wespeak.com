export const responseSuccess = (code, data) => {
  return {
    code,
    data
  }
}

export const responseError = (code, message) => {
  return {
    code,
    message
  }
}
