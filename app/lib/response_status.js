'use strict';

class responseStatus {
  Success(data, msg, status) {
    return {
      code: status || 200,
      msg: msg || 'Success',
      data: data || null,
    };
  }
}

module.exports = new responseStatus();
