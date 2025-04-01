import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import UsageDetails from "./UsageDetails";
import BillingInfo from "./BillingInfo";

const UserProfileIcon = ({ si }) => (
  <div>
    <FaUser size={si} />
  </div>
);
const Logout = ({ handleLogout, user }) => (
  <div className="flex justify-end ">
    <div className="w-[250px]  h-[230px] text-center p-5 bg-gray-100 border-4 border-green-200 shadow-2xl mt-[45px] mr-[65px]  absolute rounded-xl rounded-tr-none ">
      <div className="ml-[68px] h-[65px] w-[65px] mt-[-6px] text-green-700 rounded-full border-solid border-green-600   border-4 p-1 cursor-pointer active:border-gray-400 ">
        <UserProfileIcon si={48} />
      </div>
      <h1 className="mt-4 font-semibold ">{user.name}</h1>
      <h1 className=" mt-1 mb-3 text-sm">{user.email}</h1>
      <button
        onClick={handleLogout}
        className="text-sm text-white ml-1 border-2 p-[7px] bg-green-700 hover:bg-green-600 hover:shadow-lg active:bg-green-800 rounded-lg active:border-collapse active:font-semibold active:shadow-2xl"
      >
        LogOut
      </button>
    </div>
  </div>
);

const HomePage = (userDetails) => {
  const user = userDetails.user;
  const generateInvoice = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/invoice/generate-invoice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      alert("Invoice sent to your email!");
    } catch (error) {
      console.error("Error Details:", error);
      alert("Failed to send the invoice.");
    }
  };

  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };

  const [showItem, setShowItem] = useState(false);

  return (
    <div>
      <div className="sticky top-0  z-20 w-screen font-serif">
        <div className=" flex border-3 border bg-green-700 shadow-3xl rounded-b-2xl shadow-lg sticky ">
          <ul className="mt-1 flex justify-between px-10 py-4 text-center  w-full">
            <Link to="/">
              <li className="active:font-semibold text-white link-underline link-underline-black">
                Home
              </li>
            </Link>

            <div
              className="h-9 w-10 mt-[-6px] text-white rounded-3xl border-solid border-4 p-1 cursor-pointer active:border-gray-400"
              onClick={() => setShowItem(!showItem)}
            >
              <UserProfileIcon si={25} />
            </div>
          </ul>

          {showItem && <Logout handleLogout={logout} user={user} />}
        </div>
      </div>
      <div className="p-8 space-y-4 text-center">
        <h1 className="text-3xl font-serif"> Billing and Invoice Reminder</h1>
        <h1 className="text-2xl font-thin  my-6">Welcome, {user.name}</h1>
        <div className="flex flex-row justify-center m-4">
          <UsageDetails />
          <BillingInfo />

          <div className="text-center ml-4 mt-[100px] ">
            <button
              onClick={generateInvoice}
              className="mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 active:bg-green-700"
            >
              Generate Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
