"use client";

import React, { useState, useEffect } from "react";

const WeatherApp: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [loeading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  return <div>WeatherApp!</div>

}

export default WeatherApp;