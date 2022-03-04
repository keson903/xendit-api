const uuid = require("uuid");
const XenditApiError = require("../error/ApiError");

const Xendit = require("xendit-node");

const { API_KEY, API_URL } = process.env;

const { Invoice } = new Xendit({
  secretKey: API_KEY,
  // staging having issue
  // secretKey: xnd_development_CZ09HcvvowfzbPRbjWuJ16DPURmv1S1VLoQS86LrwvvF4SjsyEZEnV3Q3FU7jE
  //   xenditURL: "https://api-staging.xendit.co",
});
const invoiceSpecificOptions = {};
const invoice = new Invoice(invoiceSpecificOptions);

const create = async (amount) => {
  try {
    return await invoice.createInvoice({
      externalID: uuid.v4(),
      amount,
    });
  } catch (ex) {
    throw new XenditApiError("createInvoice", ex.message);
  }
};

const get = async (invoiceID) => {
  try {
    return await invoice.getInvoice({ invoiceID });
  } catch (ex) {
    throw new XenditApiError("getInvoice", ex.message);
  }
};

module.exports = {
  create,
  get,
};
