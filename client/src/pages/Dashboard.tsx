import { useEffect } from "react";
import { useNavigate } from "react-router";
import debitcard from "../../public/debitcard.jpeg";
import creditcard from "../../public/creditcard.jpeg";
import pancard from "../../public/pan.jpeg";
import aadhaar from "../../public/addhar.jpeg";
import licence from "../../public/drivinglicence.jpeg";
import voterId from "../../public/voterid.jpeg";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("E_UserAuthToken")) {
      navigate("/auth-login");
    }
  }, []);

  const userName = localStorage.getItem("E_UserName");

  const cards = [
    { image: debitcard, title: "Debit Card", path: "/debit-list" },
    { image: creditcard, title: "Credit Card", path: "/credit-list" },
    { image: pancard, title: "Pan Card", path: "/pan-list" },
    { image: aadhaar, title: "Aadhaar Card", path: "/aadhaar-list" },
    { image: licence, title: "Driving Licence", path: "/drivinglicense-list" },
    { image: voterId, title: "Voter ID", path: "/voterid-list" },
  ];

  return (
    <main className='p-6 sm:p-8 font-roboto min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] bg-gradient-to-b from-blue-50 to-gray-100'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-800 animate-fade-in'>
            Welcome back,{" "}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600'>
              {userName}
            </span>
            !
          </h1>
          <p className='text-sm sm:text-base text-gray-600 mt-2 animate-slide-up'>
            Securely manage and access all your essential details in one place.
          </p>
        </div>

        <div className='grid grid-cols-1 pt-4  sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {cards.map((card: any, index: any) => (
            <div
              key={index}
              onClick={() => navigate(card.path)}
              className='bg-white p-4 cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 hover:-translate-y-1 group'>
              <div className='relative aspect-w-4 aspect-h-3 overflow-hidden rounded-lg'>
                <img
                  src={card.image}
                  alt={card.title}
                  className='w-full h-full object-cover transition-transform group-hover:scale-110 duration-500'
                />
                <div className='absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                  <h2 className='text-lg sm:text-xl font-bold text-white bg-black/50 px-3 py-1 rounded-md animate-fade-in'>
                    {card.title}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
