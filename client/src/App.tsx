import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Loginpage from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import Navbar from "./components/shared/Navbar";
import DebitList from "./pages/Cards/debit/DebitList";
import CreditList from "./pages/Cards/credit/CreditList";
import UploadDebitCard from "./components/UploadCards/debit/UploadCard";
import UploadCreditCard from "./components/UploadCards/credit/UploadCredit";
import PanList from "./pages/Cards/pan/PanList";
import UploadPanCard from "./components/UploadCards/pan/UploadCard";
import AadhaarList from "./pages/Cards/aadhaar/AadhaarList";
import UploadAadhaarCard from "./components/UploadCards/aadhaar/UploadCard";
import DrivinglicenseList from "./pages/Cards/driving-license/DrivingList";
import UploadDrivingLicense from "./components/UploadCards/drivinglicense/UploadCard";
import UploadVoterId from "./components/UploadCards/voterId/UploadCard";
import VoterIdList from "./pages/Cards/voterId/VoterIdList";
import Forgetpassword from "./pages/auth/Forgetpassword";
import ChangePassword from "./pages/auth/changepassword";

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

function MainApp() {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/",
    "/auth-register",
    "/forget-password",
    "/change-password",
  ];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Loginpage />} />
        <Route path='/auth-register' element={<Registration />} />
        <Route path='/forget-password' element={<Forgetpassword />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/debit-list' element={<DebitList />} />
        <Route path='/upload-debit-card/:id?' element={<UploadDebitCard />} />
        <Route path='/credit-list' element={<CreditList />} />
        <Route path='/upload-credit-card/:id?' element={<UploadCreditCard />} />
        <Route path='/pan-list' element={<PanList />} />
        <Route path='/upload-pan-card/:id?' element={<UploadPanCard />} />
        <Route path='/aadhaar-list' element={<AadhaarList />} />
        <Route
          path='/upload-aadhaar-card/:id?'
          element={<UploadAadhaarCard />}
        />
        <Route path='/drivinglicense-list' element={<DrivinglicenseList />} />
        <Route
          path='/upload-drivinglicense-card/:id?'
          element={<UploadDrivingLicense />}
        />
        <Route path='/voterid-list' element={<VoterIdList />} />
        <Route path='/upload-voterid/:id?' element={<UploadVoterId />} />
      </Routes>
    </>
  );
}

export default App;
