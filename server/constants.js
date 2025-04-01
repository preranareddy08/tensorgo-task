const mockBillingData = {
  billingCycle: "March 1 - March 31",
  totalCost: "Rs. 56,434",
  paymentStatus: "Pending",
  dueDate: "April 9, 2025",
  invoiceNumber: "IN209472345",
  lastPaymentDate: "Dec 30, 2024",
};

const mockUsageData = {
  usage: {
    apiCalls: 1200,
    storage: "10GB",
    bandwidth: "100GB",
    uptime: "99.9%",
    activeSessions: 64,
  },
  activeUsers: 34,
};

module.exports.mockBillingData = mockBillingData;
module.exports.mockUsageData = mockUsageData;
