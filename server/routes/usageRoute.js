const express = require("express");
const router = express.Router();

const { getUsageDetails } = require("../controllers/usagedetailscontroller");

router.get("/usage-details", getUsageDetails);

module.exports = router;
