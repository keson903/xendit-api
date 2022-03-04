const express = require("express");
const router = express.Router();

const { get, query, webhook, toggleWallet } = require("../controller/get");
const { create } = require("../controller/create");

router.get("/:id", get);
router.get("/query/:id", query);
router.post("/webhook", webhook);
router.post("/toggle/:id", toggleWallet);
router.post("/", create);

module.exports = router;
