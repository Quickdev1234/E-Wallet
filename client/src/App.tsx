import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Loginpage from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import UploadCard from "./components/UploadCard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/auth-login' element={<Loginpage />} />
          <Route path='/auth-register' element={<Registration />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/uplaod-card' element={<UploadCard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
