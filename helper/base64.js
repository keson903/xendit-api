const encode = (value) => {
  const buff = Buffer.from(value, "utf-8");
  return buff.toString("base64");
};

module.exports = { encode };
