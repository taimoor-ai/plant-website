import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PlantContext = createContext();

export const PlantProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);
  const [isLoading2, setIsLoading] = useState(true);
  const [accessories,setAccessories]=useState([]);
  const [userProfile,setUserProfile]=useState({});
  const [user,setUser]=useState({});
  const setUserGlobal=(user)=>{
      setUser(user);
  }
  const fetchUserProfile=async(userid)=>{
    try {
      console.log("i am UserProfile fetch")
      setIsLoading(true);
      console.log(user)  
      const response = await axios.get(`http://localhost:3000/staff/${userid}`);
      console.log(response.data)
      setUserProfile(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching accessories:", error);
      setIsLoading(false);
    }
  }

  const fetchAccessories=async()=>{
    try {
      console.log("i am accesories fethc")
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/accessory/get/");
      setAccessories(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching accessories:", error);
      setIsLoading(false);
    }
  }
  // Fetch from API
  const fetchPlants = async () => {
    try {
      const response = await axios.get('http://localhost:3000/product/plants');
      setPlants(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch plants', error);
      setIsLoading(false);
    }
  };
  useEffect(()=>{
    fetchAccessories();
  },[])
  useEffect(() => {
    fetchPlants();
  }, []);
  // useEffect(()=>{
  //   fetchUserProfile();
  // },[])
  const deletePlant = (ids) => {
    console.log(ids)
    setPlants(prev => prev.filter(plant => !ids.includes(plant._id)));
    axios.post('http://localhost:3000/product/plants/deleteBulk', { ids });
  };
  const addPlantLocally = (newPlant) => {
    setPlants(prevPlants => [...prevPlants, newPlant]);
  };
  

  return (
    <PlantContext.Provider value={{ plants, isLoading2, deletePlant,user,fetchUserProfile,userProfile,setUserGlobal, fetchPlants,accessories,fetchAccessories ,addPlantLocally}}>
      {children}
    </PlantContext.Provider>
  );
};
