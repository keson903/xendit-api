class XenditApiError extends Error {
  constructor(method, message) {
    super(`${method}:${message}`); // (1)
    this.name = "XenditApiError"; // (2)
  }
}

module.exports = XenditApiError;
