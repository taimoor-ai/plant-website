// MainContent.jsx

import React, { useState, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PlantCard = ({ plant, chartId }) => {
  const chartRef = useRef(null);

  const growthData = {
    labels: plant.growthData.labels,
    datasets: [
      {
        label: "Growth %",
        data: plant.growthData.values,
        borderColor: "#3BAF7D",
        tension: 0.4,
        fill: true,
        backgroundColor: "rgba(59, 175, 125, 0.1)",
      },
    ],
  };

  useEffect(() => {
    return () => {
      const chart = chartRef.current;
      if (chart && chart.chart) {
        chart.chart.destroy();
      }
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-10 hover:shadow-xl transition-all">
      {/* Plant Image and Info */}
      <div className="flex-1 flex flex-col items-center justify-center text-center mb-6 md:mb-0">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-32 h-32 object-contain mb-4"
        />
        <h2 className="text-xl font-bold text-green-900">{plant.name}</h2>
        <p className="text-sm text-gray-500">{plant.description}</p>
        {plant.saleTag && (
          <span className="mt-2 inline-block bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-900 font-semibold px-3 py-1 rounded-full text-xs shadow">
            {plant.saleTag}
          </span>
        )}
      </div>

      {/* Plant Stats */}
      <div className="flex-1 grid grid-cols-2 gap-4 text-center text-sm text-gray-700">
        <div className="p-4 bg-white rounded-xl shadow">
          <div className="text-green-800 font-semibold">Chl A level</div>
          <div className="text-sm">{plant.chlALevel}</div>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <div className="text-green-800 font-semibold">Chl B level</div>
          <div className="text-sm">{plant.chlBLevel}</div>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <div className="text-green-800 font-semibold">Soil Health</div>
          <div className="text-sm">{plant.soilHealth}</div>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <div className="text-green-800 font-semibold">Light Condition</div>
          <div className="text-sm">{plant.lightCondition}</div>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <div className="text-green-800 font-semibold">Humidity Level</div>
          <div className="text-sm">{plant.humidityLevel}</div>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <div className="text-green-800 font-semibold">Fertilization</div>
          <div className="text-sm">{plant.fertilizationStatus}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 mt-6 md:mt-0 md:ml-6">
        <div className="bg-white p-4 rounded-xl shadow h-48">
          <h3 className="text-green-800 font-bold text-sm mb-2">Growth Analysis</h3>
          <Line
            ref={chartRef}
            data={growthData}
            options={{
              plugins: { legend: { display: false } },
              scales: {
                x: { display: false },
                y: { display: false },
              },
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default function MainContent() {
  const [plants, setPlants] = useState([
    {
      id: 1,
      name: "Bird of Paradise",
      description: "Lush, glossy, tropical green leaves.",
      chlALevel: "0.749: 00.02b",
      chlBLevel: "0.738: 00.02b",
      soilHealth: "Dry & Cracked",
      lightCondition: "Minimal",
      humidityLevel: "70%",
      fertilizationStatus: "Balanced",
      image: "https://img.icons8.com/color/96/000000/plant-under-sun.png",
      growthData: {
        labels: ["mar", "apr", "may", "jun", "jul", "aug", "sep"],
        values: [1, 2, 3.5, 4, 3.5, 4.2, 5],
        currentGrowth: 4,
        currentMonth: "jun",
      },
      saleTag: "Summer Sale",
    },
    {
      id: 2,
      name: "Tomato Plant",
      description: "Rich red fruit-bearing plant.",
      chlALevel: "0.710: 00.01b",
      chlBLevel: "0.705: 00.01b",
      soilHealth: "Optimal",
      lightCondition: "Moderate",
      humidityLevel: "65%",
      fertilizationStatus: "Needs Boost",
      image: "https://img.icons8.com/color/96/000000/tomato.png",
      growthData: {
        labels: ["mar", "apr", "may", "jun", "jul", "aug", "sep"],
        values: [1.2, 2, 2.8, 3.1, 3.8, 4.1, 4.5],
        currentGrowth: 3.1,
        currentMonth: "jun",
      },
      saleTag: "Limited Offer",
    },
  ]);

  const [query, setQuery] = useState("");

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(query.toLowerCase())
  );

  const trending = plants
    .sort((a, b) => b.growthData.currentGrowth - a.growthData.currentGrowth)
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-green-800 tracking-wide mb-10">
        🌱 Plantify Plant Dashboard
      </h1>

      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 hover:shadow-xl transition-all">
          <div className="text-3xl font-bold text-green-700">128</div>
          <p className="text-sm text-gray-500 mt-1">Orders Placed</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 hover:shadow-xl transition-all">
          <div className="text-3xl font-bold text-green-700">102</div>
          <p className="text-sm text-gray-500 mt-1">Orders Shipped</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 hover:shadow-xl transition-all">
          <div className="text-3xl font-bold text-green-700">95</div>
          <p className="text-sm text-gray-500 mt-1">Orders Confirmed</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 hover:shadow-xl transition-all">
    <div className="text-3xl font-bold text-green-700">
      ${134535}
    </div>
    <p className="text-sm text-gray-500 mt-1">Total Revenue</p>
  </div>
      </div>

      {/* Search and Navigation */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="relative mb-4 md:mb-0 md:w-1/2">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-500 shadow-sm"
            placeholder="Search for a plant..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-lg">🔍</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {["All Plants", "Accessories", "Categories"].map((btn, idx) => (
            <button
              key={idx}
              className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:scale-105 transition"
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Plants */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">🔥 Trending Plants</h2>
        <ul className="space-y-3">
          {trending.map((plant, index) => (
            <li
              key={plant.id}
              className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <img src={plant.image} className="w-8 h-8" alt={plant.name} />
                <span className="font-medium text-gray-700">{plant.name}</span>
              </div>
              <span className="text-xs text-gray-500">{index + 1}st Trending</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Plant Cards */}
      {filteredPlants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} chartId={`chart-${plant.id}`} />
      ))}
    </div>
  );
}
