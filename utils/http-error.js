class HttpError extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super()
    this.errorCode = errorCode
    this.code = code
    this.msg = msg
  }
}

class ParameterError extends HttpError {
  constructor(msg, errorCode) {
    super()
    this.code = 400
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || 10000
  }
}

class AuthFailed extends HttpError {
  constructor(msg, errorCode) {
    super()
    this.code = 401
    this.msg = msg || '授权失败'
    this.errorCode = errorCode || 10004
  }
}

class NotFound extends HttpError {
  constructor(msg, errorCode) {
    super()
    this.code = 404
    this.msg = msg || '404找不到'
    this.errorCode = errorCode || 10005
  }
}

class Forbidden extends HttpError {
  constructor(msg, errorCode) {
    super()
    this.code = 403
    this.msg = msg || '禁止访问'
    this.errorCode = errorCode || 10006
  }
}

class Existing extends HttpError {
  constructor(msg, errorCode) {
    super()
    this.code = 412
    this.msg = msg || '已存在'
    this.errorCode = errorCode || 10007
  }
}

module.exports = {
  HttpError,
  ParameterError,
  AuthFailed,
  NotFound,
  Forbidden,
  Existing
}
