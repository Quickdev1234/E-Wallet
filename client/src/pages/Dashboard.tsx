import React from "react";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("E_UserName");
  const uploadedCards = [
    {
      id: 1,
      cardNumber: "**** **** **** 1234",
      cardHolderName: "John Doe",
      expiryDate: "12/25",
      cardType: "Credit Card",
      ccv: "***",
      bankName: "Bank of America",
    },
    {
      id: 2,
      cardNumber: "**** **** **** 5678",
      cardHolderName: "Jane Smith",
      expiryDate: "01/24",
      cardType: "Debit Card",
      ccv: "***",
      bankName: "Chase Bank",
    },
  ];

  return (
    <main className='p-6 h-full font-grotesk bg-gradient-to-b from-gray-100 to-gray-200 min-h-[100vh]'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-4 items-start'>
          <h1 className='text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600'>
            Hello {userName} !
          </h1>
        </div>
      </div>

      <div className='mt-8'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg font-semibold text-gray-800'>
            Uploaded Cards
          </h2>
          <button
            onClick={() => navigate("/uplaod-card")}
            className='px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400'>
            Upload Card Details
          </button>
        </div>
        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {uploadedCards.length > 0 ? (
            uploadedCards.map((card) => (
              <div
                key={card.id}
                className='p-4 bg-white shadow-lg rounded-lg border border-gray-200'>
                <h3 className='text-lg font-semibold text-gray-700'>
                  {card.cardHolderName}
                </h3>
                <p className='text-sm text-gray-600 mt-1'>
                  <span className='font-medium'>Card Number:</span>{" "}
                  {card.cardNumber}
                </p>
                <p className='text-sm text-gray-600 mt-1'>
                  <span className='font-medium'>Expiry Date:</span>{" "}
                  {card.expiryDate}
                </p>
                <p className='text-sm text-gray-600 mt-1'>
                  <span className='font-medium'>Card Type:</span>{" "}
                  {card.cardType}
                </p>
                <p className='text-sm text-gray-600 mt-1'>
                  <span className='font-medium'>CCV:</span> {card.ccv}
                </p>
                <p className='text-sm text-gray-600 mt-1'>
                  <span className='font-medium'>Bank Name:</span>{" "}
                  {card.bankName}
                </p>
              </div>
            ))
          ) : (
            <p className='text-gray-600'>No cards uploaded yet.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
