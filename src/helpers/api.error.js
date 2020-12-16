class ApiError extends Error {
  constructor(data, status) {
    super(data);

    this.name = this.constructor.name;

    this.constructor = ApiError;
    this.__proto__ = ApiError.prototype;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.data = data;
    this.status = status;

    this.message = `API Error. Status: ${status} ${JSON.stringify(data)}`;
  }

  inspect() {
    return this.stack;
  }
}

export default ApiError;
