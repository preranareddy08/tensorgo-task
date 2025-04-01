import { useState, useEffect } from "react";

const BillingInfo = () => {
  const [billing, setBilling] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBillingInfo = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/billing/getBillingDetails",
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setBilling(data.billing);
        } else {
          console.error("Failed to fetch billing info");
        }
      } catch (error) {
        console.error("Error fetching billing info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingInfo();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (!billing)
    return (
      <div className="text-center text-red-500">No billing data available</div>
    );

  return (
    <div className="p-6 bg-gray-100 shadow-md rounded-2xl w-4/12 mx-4 font-serif">
      <h2 className="text-xl font-bold mb-4">Billing Information</h2>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span className="font-semibold">Billing Cycle:</span>
          <span>{billing.billingCycle}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold">Total Cost:</span>
          <span>{billing.totalCost}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold">Payment Status:</span>
          <span>{billing.paymentStatus}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold">Due Date:</span>
          <span>{billing.dueDate}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold">Invoice Number:</span>
          <span>{billing.invoiceNumber}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold">Last Payment Date:</span>
          <span>{billing.lastPaymentDate}</span>
        </li>
      </ul>
    </div>
  );
};
export default BillingInfo;
