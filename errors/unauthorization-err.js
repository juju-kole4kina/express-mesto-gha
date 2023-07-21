const { UNAUTHORIZATION_STATUS_CODE } = require('../utils/constants');

class UnauthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZATION_STATUS_CODE;
  }
}

module.exports = UnauthorizationError;
