import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import RightPanel from './components/RightPanel';
import Analytics from './components/Analytics';
import Orders from './components/Orders';
import Reports from './components/Reports';
import Store from './components/Store';
import Profile from './components/Profile';
import Settings from './components/Settings';
import AddPlant from './components/AddPlant';
import PlantList from './components/PlantList';
import AddAccessory from './components/AddAccessory';
import Accessories from './components/Accessories';
import UpdateAccessory from './components/UpdateAccessory';
import Employees from './components/Employees';
import OrderDetails from './components/OrderDetails';
import SignIn from './components/SignIn';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { PlantContext } from '../context/plantsContext';
import { useContext } from 'react';
function Layout({ userRole }) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#F6FAF7] overflow-hidden">
      <Sidebar userRole={userRole} />
      <main className="flex-1 flex justify-center plant-scrollbar-main items-start p-8 h-full overflow-y-auto">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/store" element={<Store />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-plant" element={<AddPlant />} />
          <Route path="/plants" element={<PlantList />} />
          <Route path="/add-accessory" element={<AddAccessory />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/update-accessory" element={<UpdateAccessory />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </main>
      {location.pathname !== '/orders' && <RightPanel />}
    </div>
  );
}

function App() {
  const [userToken,setUserToken] = useState(localStorage.getItem('token')) // Replace with your auth logic
  const {user,setUserGlobal,fetchUserProfile } =useContext(PlantContext);
  useEffect(() => {
    if (userToken) {
      try {
        const decoded = jwtDecode(userToken);
        setUserGlobal(decoded); // ✅ Safe here
        console.log(decoded)
        fetchUserProfile(decoded.id);
        console.log("userLoged iN:",user)
      } catch (e) {
        console.error("Invalid token:", e);
        localStorage.removeItem("token");
        setUserToken(null);
      }
    }
  }, [userToken]); // Only run on first load or if token changes

  let userRole = user?.role || "employee"; // Use from context (safe now)

  
  return (
    <Router>
      <Routes>
        {!userToken ? (
          <>
            <Route path="*" element={<SignIn setUserToken={setUserToken} />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<Layout userRole={userRole || 'employee'} />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
