const { INTERNAL_SERVER_ERROR_STATUS_CODE } = require('../utils/constants');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INTERNAL_SERVER_ERROR_STATUS_CODE;
  }
}

module.exports = InternalServerError;
