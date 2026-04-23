import React from "react";

function ClockCard({ city, time, format24 }) {
  const options = {
    timeZone: city.timezone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: !format24,
  };

  const dateOptions = {
    timeZone: city.timezone,
    dateStyle: "long",
  };

  const formattedTime = new Intl.DateTimeFormat("en-US", options).format(time);
  const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
    time,
  );

  return (
    <div className="card">
      <h3 className="city">{city.name}</h3>
      <p className="date">{formattedDate}</p>
      <h1 className="time">{formattedTime}</h1>
    </div>
  );
}

export default ClockCard;
