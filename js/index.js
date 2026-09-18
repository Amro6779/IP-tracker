////////////////////! inputs ///////////////////////////

const ipTracker = document.getElementById("IP-tracker");
const searchButton = document.getElementById("search-button");
const rowData = document.getElementById("rowData");

////////////////////? functions ////////////////////////

searchButton.addEventListener("click", () => {
  getData(ipTracker.value);
});

async function getData(ip) {
  try {
    let ipInfo = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`,
    );
    let data = await ipInfo.json();
    displayInfo(data);
    const lat = data.location.lat;
    const lng = data.location.lng

    updateMap(lat , lng);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getData(ipTracker.value);


function displayInfo(data) {

  let ip = data.ip ;
  let postalPart =
    data.location.postalCode !== "" ? " " + data.location.postalCode : "";
  let isp = data.isp;
  let timeZone = data.location.timezone;
  let location = data.location.city + " " + data.location.country + postalPart;
  


  let cartoona = `<div class="IP-address border-end text-start w-25">
                <p class="text-secondary">IP address</p>
                <p id="IP-address" class="fw-bolder fs-4 m-0">${ip}</p>
            </div>
            <div class="location border-end text-start w-25">
                <p class="text-secondary">location</p>
                <p id="location" class="fw-bolder fs-4 m-0">${location}</p>
            </div>
            <div class="time-zone border-end text-start w-25">
                <p class="text-secondary">Time Zone</p>
                <p id="Time-Zone" class="fw-bolder fs-4 m-0">UTC${timeZone}</p>
            </div>
            <div class="isp">
                <p class="text-secondary text-start w-25">ISP</p>
                <p id="isp" class="fw-bolder fs-4 m-0">${isp}</p>
            </div>`;

  rowData.innerHTML = cartoona;
}

function updateMap(lat , lng){
   map.setView([lat , lng] , 13);
   marker.setLatLng([lat , lng]);
}

//////////////////* Leaflet Code for mapping API ///////////////////////

let map = L.map("map").setView([30.0444, 31.2357], 13);
let customIcon = L.icon({
  iconUrl: "../images/icon-location.svg",
  iconSize: [40, 50],
});


L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
let marker = L.marker([30.0444, 31.2357], { icon: customIcon }).addTo(map);
