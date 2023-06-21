class ClientError extends Error {
  constructor(message, statuscode = 400) {
    super(message);
    this.name = 'ClientError';
    this.statuscode = statuscode;
  }
}

module.exports = ClientError;
