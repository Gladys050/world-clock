import React from "react";

const cityOptions = [
  { name: "New York", timezone: "America/New_York" },
  { name: "Tokyo", timezone: "Asia/Tokyo" },
  { name: "Paris", timezone: "Europe/Paris" },
];

function Controls({ addCity, toggleFormat, format24 }) {
  const handleChange = (e) => {
    const selected = cityOptions.find((c) => c.name === e.target.value);
    if (selected) addCity(selected);
  };

  return (
    <div className="controls">
      <select onChange={handleChange}>
        <option>Select a city...</option>
        {cityOptions.map((city) => (
          <option key={city.name}>{city.name}</option>
        ))}
      </select>

      <button onClick={toggleFormat}>{format24 ? "24h" : "12h"}</button>
    </div>
  );
}

export default Controls;
