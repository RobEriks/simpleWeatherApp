"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherApp: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [loeading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const apiUrl = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`;
          try {
            const response = await axios.get(apiUrl);
            setWeather(response.data);
            setLoading(false);
          } catch (err) {
            setError("Failed to get weather");
            setLoading(false);
          }
        },
        () => setError("Location denied")
      );
    } else {
      setError("Geolocation is not supported");
    }
  }, []);
  
  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  const getBackground = () => {
    if (!weather) return "bg=gray-400";
    const condition = weather.weather[0].main.toLowerCase();

    switch(condition) {
      case "clear":
        return "bg-blue-500"
      case "clouds":
        return "bg-gary-400"
      case "rain":
        return "bg-blue-800"
      case "snow":
        return "bg-white"    
      case "thunderstorm":
        return "bg-purple-700"
      default:
        return "bg-gray-300"  
    }
    

  }
  






  return <div>WeatherApp!</div>





}



export default WeatherApp;