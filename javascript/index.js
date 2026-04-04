let selectedTZ = null;
let userTZ = null;
let userCityName = null;

function getFormatted(tz) {
  const m = moment().tz(tz);
  return {
    time: m.format("h:mm:ss") + " <small>" + m.format("A") + "</small>",
    date: m.format("MMMM Do, YYYY"),
  };
}

function updateTime() {
  const staticCities = [
    { tz: "Europe/London", tid: "t-london", did: "d-london" },
    { tz: "Australia/Sydney", tid: "t-sydney", did: "d-sydney" },
    { tz: "Africa/Harare", tid: "t-harare", did: "d-harare" },
  ];

  staticCities.forEach(function (c) {
    const f = getFormatted(c.tz);
    document.getElementById(c.tid).innerHTML = f.time;
    document.getElementById(c.did).textContent = f.date;
  });

  if (userTZ) {
    const f = getFormatted(userTZ);
    document.getElementById("t-user").innerHTML = f.time;
    document.getElementById("d-user").textContent = f.date;
  }

  if (selectedTZ) {
    const m = moment().tz(selectedTZ);
    document.getElementById("selectedTime").innerHTML =
      m.format("h:mm:ss") + " <small>" + m.format("A") + "</small>";
    document.getElementById("selectedDate").textContent =
      m.format("MMMM Do, YYYY");
  }
}

function showSelected(tz, name, sublabel) {
  selectedTZ = tz;
  document.getElementById("selectedName").textContent = name;
  document.getElementById("selectedLabel").textContent = sublabel || "";
  document.getElementById("selectedCard").style.display = "block";
  document.getElementById("cityGrid").style.display = "none";
  updateTime();
}

function showGrid() {
  selectedTZ = null;
  document.getElementById("selectedCard").style.display = "none";
  document.getElementById("cityGrid").style.display = "flex";
  document.getElementById("citySelect").value = "";
}

document.getElementById("backLink").addEventListener("click", function () {
  showGrid();
});

document.getElementById("citySelect").addEventListener("change", function () {
  const val = this.value;
  if (!val) {
    showGrid();
    return;
  }
  const label = this.options[this.selectedIndex].text;
  showSelected(val, label, "");
});

document.getElementById("myLocBtn").addEventListener("click", function () {
  const guessed = moment.tz.guess();
  const parts = guessed.replace(/_/g, " ").split("/");
  const name = parts.length > 1 ? parts[parts.length - 1] : guessed;
  userTZ = guessed;
  userCityName = name;

  const userCard = document.getElementById("userCard");
  userCard.style.display = "flex";
  document.getElementById("userCardName").textContent = name + " (you)";

  showSelected(guessed, name, "Your current location");
});

updateTime();
setInterval(updateTime, 1000);
