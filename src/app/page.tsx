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
  
  






  return <div>WeatherApp!</div>





}



export default WeatherApp;