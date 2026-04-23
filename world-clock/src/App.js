import React, { useEffect, useState } from "react";
import ClockCard from "./components/ClockCard";
import "./styles.css";

const defaultCities = [
  { name: "London", timezone: "Europe/London" },
  { name: "Sydney", timezone: "Australia/Sydney" },
  { name: "Harare", timezone: "Africa/Harare" },
];

function App() {
  const [time, setTime] = useState(new Date());
  const [cities, setCities] = useState(defaultCities); // ✅ FIXED
  const [format24, setFormat24] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const OPENCAGE_KEY = process.env.REACT_APP_OPENCAGE_KEY;

  // ⏱️ Live clock
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // 📍 Get user location
  const getMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_KEY}`,
          );

          const data = await res.json();

          // ✅ Safe check
          if (!data.results || data.results.length === 0) {
            alert("Could not detect your city");
            setLoadingLocation(false);
            return;
          }

          const components = data.results[0].components;

          const cityName =
            components.city ||
            components.town ||
            components.village ||
            components.state ||
            "Your Location";

          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

          const newCity = {
            name: cityName,
            timezone: timezone,
          };

          // ✅ Avoid duplicates
          setCities((prev) => {
            if (prev.find((c) => c.name === newCity.name)) return prev;
            return [...prev, newCity];
          });
        } catch (error) {
          console.error("Location error:", error);
          alert("Could not fetch location data");
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error(error);
        alert("Permission denied or location unavailable");
        setLoadingLocation(false);
      },
    );
  };

  return (
    <div className="app">
      <h1 className="title">World Clock 🌐</h1>
      <p className="subtitle">See the current time anywhere in the world</p>

      {/* 🔘 Controls */}
      <div className="top-controls">
        <button className="location-btn" onClick={getMyLocation}>
          {loadingLocation ? "Getting location..." : "📍 My Location"}
        </button>

        <div className="toggle">
          <button
            className={!format24 ? "active" : ""}
            onClick={() => setFormat24(false)}
          >
            12h
          </button>
          <button
            className={format24 ? "active" : ""}
            onClick={() => setFormat24(true)}
          >
            24h
          </button>
        </div>
      </div>

      {/* 🌍 Cards */}
      <div className="cards">
        {cities.map((city) => (
          <ClockCard
            key={city.name}
            city={city}
            time={time}
            format24={format24}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
