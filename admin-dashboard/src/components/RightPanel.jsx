import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedList from "./AnimatedList";
import PlantInfoModal from "./PlantInfoModal";
import axios from "axios";

//  

const RightPanel = () => {
  const navigate = useNavigate();
  const [plantList,setPlants]=useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  useEffect(() => {
    fetchPlants();
  }, []);
  const fetchPlants = async () => {
    try {
      const response = await axios.get('http://localhost:3000/product/plants');
      const extractedData = response.data.map(({ _id, name, category, imageUrl, size, water }) => ({
        _id,
        name,
        category,
        imageUrl,
        size,
        water
      }));
    
      
      setPlants(extractedData);
      
     
    } catch (error) {
      console.error('Error fetching plants:', error);
      
    }
  };
  const handlePlantSelect = (plant) => {
    setSelectedPlant(plant);
  };

  return (
    <aside className="w-80 bg-[#1B2B2B] text-white rounded-l-3xl p-6 flex flex-col items-center min-h-[50vh]">
      {/* Hanging plants illustration placeholder */}
      <div className="w-full h-28 flex items-center justify-center mb-6">
        {/* SVG or image for hanging plants */}
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
          <ellipse cx="60" cy="75" rx="50" ry="5" fill="#223232" />
          <circle cx="30" cy="40" r="18" fill="#A7E9AF" />
          <circle cx="90" cy="40" r="18" fill="#A7E9AF" />
          <rect x="55" y="20" width="10" height="30" rx="5" fill="#66BB6A" />
        </svg>
      </div>
      <button
        onClick={() => navigate("/add-plant")}
        className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 rounded-xl mb-8 transition text-lg shadow"
      >
        + Add New Plant
      </button>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Plant List</h3>
          <button className="text-xs text-orange-300 hover:underline">
            see all
          </button>
        </div>
        <span className="max-h-64 overflow-y-auto pr-2 scollbar-hide bg-[#223232]/60 rounded-xl shadow-inner">
          <AnimatedList
            items={plantList}
            onItemSelect={handlePlantSelect}
            showGradients={true}
            enableArrowNavigation={true}
            displayScrollbar={true}
          />
        </span>
      </div>

      {/* Plant Info Modal */}

      {selectedPlant&&<PlantInfoModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
      />}
    </aside>
  );
};

export default RightPanel;
