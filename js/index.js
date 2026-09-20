//////////////////* Leaflet Code for mapping API ///////////////////////

let map = L.map("map").setView([30.0444, 31.2357], 13);
let customIcon = L.icon({
  iconUrl: "../images/icon-location.svg",
  iconSize: [40, 50],
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
let marker = L.marker([30.0444, 31.2357], { icon: customIcon }).addTo(map);

////////////////////! inputs ///////////////////////////

const ipTracker = document.getElementById("IP-tracker");
const rowData = document.getElementById("rowData");
const ipForm = document.getElementById("ip-form");

////////////////////? functions ////////////////////////

ipForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getData(ipTracker.value);
});

async function getData(ip) {
  const errorBox = document.getElementById("error-message");
  errorBox.classList.add("d-none");
  errorBox.textContent = "";

  try {
    let apiUrl = !ip ? `/api/get-ip-data` : `/api/get-ip-data?ip=${ip}`;
    let ipInfo = await fetch(apiUrl);
    let data = await ipInfo.json();

    if (data.messages || !data.location) {
      throw new Error("Invalid IP address or domain.");
    }

    displayInfo(data);

    const lat = data.location.lat;
    const lng = data.location.lng;
    updateMap(lat, lng);
  } catch (error) {
    errorBox.textContent = "Something went wrong. Please check the IP address or domain and try again.";
    errorBox.classList.remove("d-none");
  }
}
getData(ipTracker.value);

function displayInfo(data) {
  let postalPart =
    data.location.postalCode !== "" ? " " + data.location.postalCode : "";
  let location = data.location.city + " " + data.location.country + postalPart;
  let timeZone = data.location.timezone;

  document.getElementById("IP-address").textContent = data.ip;
  document.getElementById("location").textContent = location;
  document.getElementById("Time-Zone").textContent = `UTC${timeZone}`;
  document.getElementById("isp").textContent = data.isp;
}

function updateMap(lat, lng) {
  map.setView([lat, lng], 13);
  marker.setLatLng([lat, lng]);
}
