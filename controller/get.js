const invoiceService = require("../services/invoiceService");

const SSE_HEADER = {
  "Cache-Control": "no-cache",
  "Content-Type": "text/event-stream",
  Connection: "keep-alive",
};

const clients = {};
const invoices = {};

const get = async (req, res) => {
  const { id } = req.params;
  const invoice = await invoiceService.get(id);
  res.json(invoice);
};

const query = async (req, res) => {
  const { id } = req.params;

  clients[id] = clients[id] || { res };

  res.set(SSE_HEADER);
  res.flushHeaders();

  const invoice = await invoiceService.get(id);
  sendSSE(id, invoice);

  req.on("close", () => {
    console.log(`${id} Connection closed`);
    delete clients[id];
  });
};

// MOCK the toggle only for demo purpose
const toggleWallet = async (req, res) => {
  const { id } = req.params;
  const { ewallet } = req.body;
  const invoice = invoices[id] || (await invoiceService.get(id));
  const { available_ewallets = [], ...rest } = invoice;

  const ewallets = available_ewallets.find(
    ({ ewallet_type }) => ewallet_type === ewallet
  )
    ? available_ewallets.filter(({ ewallet_type }) => ewallet_type !== ewallet)
    : [...available_ewallets, { ewallet_type: ewallet }];

  const updated = {
    ...rest,
    available_ewallets: ewallets,
  };

  invoices[id] = updated;

  sendSSE(id, updated);
  res.json(updated);
};

const webhook = async (req, res) => {
  console.log(req.body);
  const { id } = req.body;

  const invoice = await invoiceService.get(id);
  sendSSE(id, invoice);
  res.json(invoice);
};

function sendSSE(id, data) {
  if (!clients[id]) {
    return;
  }

  clients[id].res.write(`data: ${JSON.stringify(data)}\n\n`);
}

module.exports = { query, get, webhook, toggleWallet };
