
//////////////* Leaflet Code for mapping API *////////////////////

let map = L.map("map").setView([30.0444, 31.2357], 13);
let customIcon = L.icon({
  iconUrl: "../images/icon-location.svg",
  iconSize: [40, 50],
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
L.marker([30.0444, 31.2357], { icon: customIcon }).addTo(map);

//////////////! inputs ///////////////////

const ipTracker = document.getElementById("IP-tracker");
const searchButton = document.getElementById("search-button");
const rowData = document.getElementById("rowData");

//////////////? functions /////////////////
searchButton.addEventListener("click", () => {
  displayInfo()
});
 
function displayInfo() {
  cartoona = `<div class="IP-address border-end text-start w-25">
                <p class="text-secondary">IP address</p>
                <p id="IP-address" class="fw-bolder fs-4 m-0">${ipTracker.value}</p>
            </div>
            <div class="location border-end text-start w-25">
                <p class="text-secondary">location</p>
                <p id="location" class="fw-bolder fs-4 m-0">cairo</p>
            </div>
            <div class="time-zone border-end text-start w-25">
                <p class="text-secondary">Time Zone</p>
                <p id="Time-Zone" class="fw-bolder fs-4 m-0">UTC-05:00</p>
            </div>
            <div class="isp">
                <p class="text-secondary text-start w-25">ISP</p>
                <p id="isp" class="fw-bolder fs-4 m-0">SpaceX StarLink</p>
            </div>`;

            rowData.innerHTML = cartoona;
}
