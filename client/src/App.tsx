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
          <Route path='/' element={<Loginpage />} />
          <Route path='/auth-register' element={<Registration />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/upload-card' element={<UploadCard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
