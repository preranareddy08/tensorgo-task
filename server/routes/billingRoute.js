const express = require("express");
const router = express.Router();

const {
  getbillinginfocontroller,
} = require("../controllers/getbillinginfocontroller");

router.get("/getBillingDetails", getbillinginfocontroller);

module.exports = router;
