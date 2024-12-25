"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherApp: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [loading, setLoading] = useState<boolean>(true);
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
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-200 text-black">
        Loading weather
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-red-500 text-white">
        {error}
      </div>
    );
  }


return (
  <div>
    className={`min-h-screen flex flex-col items-center justify-center text-white ${getBackground()}`}


    <div className="p-8 rounded-lg shadow-lg bg-opacity-50 bg-gray-800">
      <h1 className="text-3xl font-bold mb-4">
        {weather.name}, {weather.sys.country}
      </h1>
      <h2 className="text-2xl mb-4">
        {unit === "C"
          ? `${weather.main.temp} °C`
          : `${((weather.main.temp * 9) / 5 + 32).toFixed(1)} °F`}
      </h2>
      
      </div> 
  </div>
)





}



export default WeatherApp;