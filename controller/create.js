const invoiceService = require("../services/invoiceService");

const create = async (req, res) => {
  const { amount } = req.body;
  const invoice = await invoiceService.create(amount);

  res.json(invoice);
};

module.exports = { create };
