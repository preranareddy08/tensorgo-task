const { mockBillingData } = require("../constants");

exports.getbillinginfocontroller = (req, res) => {
  try {
    if (mockBillingData.length === 0) throw new Error("empty");
    res.status(200).json({ billing: mockBillingData });
  } catch (e) {
    res.status(404).json({ message: e });
  }
};
