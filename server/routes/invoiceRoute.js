const express = require("express");
const router = express.Router();

const { invoiceGenerator } = require("../controllers/invoicecontroller");
// to handle invoice generation to the client mail id
router.post("/generate-invoice", invoiceGenerator);

module.exports = router;
