import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import RightPanel from "./components/RightPanel";
import Analytics from "./components/Analytics";
import Orders from "./components/Orders";
import Reports from "./components/Reports";
import Store from "./components/Store";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import AddPlant from "./components/AddPlant";
import PlantList from "./components/PlantList";
import AddAccessory from "./components/AddAccessory";
import Accessories from "./components/Accessories";
import UpdateAccessory from "./components/UpdateAccessory";
import Employees from "./components/Employees";
import OrderDetails from "./components/OrderDetails";
import SignIn from "./components/SignIn";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { PlantContext } from "../context/plantsContext";
import { useContext } from "react";
function Layout({ userRole }) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#ffffffef] overflow-hidden">
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
      {location.pathname !== "/orders" &&
        location.pathname !== "/employees" &&
        location.pathname !== "/" && <RightPanel />}
    </div>
  );
}
function App() {
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));
  const { user, fetchUserProfile, getUser } = useContext(PlantContext);
  const [userRole, setUserRole] = useState(null);

  // This effect runs once to decode the token and fetch the user
  useEffect(() => {
    console.log("i am useEffect in App.jsx");
    console.log("userToken = ",userToken);
    console.log("user = ", user);

    try {
      if (localStorage.getItem("token")) {
        const decoded = jwtDecode(localStorage.getItem("token"));
        console.log("decode user = ", decoded);
        const userId = decoded?.id;
        setUserRole(decoded?.role || "employee"); // Default to 'employee' if role is not present
        if (userId) {
          fetchUserProfile(userId); // This will update `user` via context
        }
      }
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      setUserToken(null);
    }
  }, [user,userToken]);

  return (
    <Router>
      <Routes>
      
        {!userToken ? (
          <Route path="*" element={<SignIn setUserToken={setUserToken} />} />
        ) : (
          <Route
            path="/*"
            element={<Layout userRole={userRole || "employee"} />}
          />
        )}
      </Routes>
    </Router>
  );
}
export default App;
