const mockUsageData = require("../constants");

exports.getUsageDetails = (req, res) => {
  try {
    if (mockUsageData.length === 0) throw new Error("empty");
    const data = mockUsageData;
    res.status(200).json({ usage: data });
    //console.log(mockUsageData);
  } catch (e) {
    res.status(404).json({ message: e });
  }
};
