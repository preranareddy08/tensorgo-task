import React, { useEffect, useState } from "react";

const UsageDetails = () => {
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsageDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/usage/usage-details",
          {
            credentials: "include", // Include cookies for session
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUsage(data.usage.mockUsageData);
        } else {
          console.error("Failed to fetch usage details");
        }
      } catch (error) {
        console.error("Error fetching usage details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsageDetails();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (!usage)
    return (
      <div className="text-center text-red-500">No usage data available</div>
    );

  return (
    <div className="p-6 bg-gray-100 shadow-md rounded-2xl  w-4/12 font-serif">
      <h2 className="text-xl font-bold mb-4">Usage Details</h2>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span className="font-semibold">API Calls:</span>
          <span>{usage.usage.apiCalls}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold">Storage Used:</span>
          <span>{usage.usage.storage}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold">Band Width:</span>
          <span>{usage.usage.bandwidth}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold">Up Time:</span>
          <span>{usage.usage.uptime}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold">Active Sessions:</span>
          <span>{usage.usage.activeSessions}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold">Active Users:</span>
          <span>{usage.activeUsers}</span>
        </li>
      </ul>
    </div>
  );
};
export default UsageDetails;
