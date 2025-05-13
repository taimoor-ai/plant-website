import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import RightPanel from './components/RightPanel'
import Analytics from './components/Analytics'
import Reports from './components/Reports'
import Store from './components/Store'
import Profile from './components/Profile'
import Settings from './components/Settings'
import AddPlant from './components/AddPlant'
import PlantList from './components/PlantList'
import AddAccessory from './components/AddAccessory'
import Accessories from './components/Accessories'

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-[#F6FAF7] overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex justify-center plant-scrollbar-main items-start p-8 h-full overflow-y-auto">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/store" element={<Store />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/add-plant" element={<AddPlant />} />
            <Route path="/plants" element={<PlantList />} />
            <Route path="/add-accessory" element={<AddAccessory />} />
            <Route path="/accessories" element={<Accessories />} />
          </Routes>
        </main>
        <RightPanel />
      </div>
    </Router>
  )
}

export default App
