import { BrowserRouter, Routes, Route } from "react-router-dom";


import ProducePage from './pages/ProducePage';
import Basket from './pages/Basket';
import Summary from './pages/Summary'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      {/* App contains the routes to all the separate pages of the app */}
      <BrowserRouter>
        <Routes>
          <Route index element={<ProducePage />} />
          <Route path="/produce" element={<ProducePage />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
