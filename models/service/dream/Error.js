'use strict';

class DreamServiceError extends Error {
  code;
  name;
  message;
  timeStamp;

  constructor(message) {
    super();
    this.code = 'Internal_Server_Error';
    this.name = 'DreamServiceError';
    this.message = message;
    this.timeStamp = new Date();
  }
}

module.exports = DreamServiceError;
