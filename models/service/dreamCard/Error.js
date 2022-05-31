class DreamCardServiceError extends Error {
  code;
  name;
  message;
  timeStamp;

  constructor(message) {
    super();
    this.code = 'Internal_Server_Error';
    this.name = 'DreamCardrServiceError';
    this.message = message;
    this.timeStamp = new Date();
  }
}

module.exports = DreamCardServiceError;
