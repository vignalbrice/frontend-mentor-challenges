// Here
import mapboxgl from "mapbox-gl";

type AddressInfo = {
  as: {
    adn: number;
    name: string;
    route: string;
    domain: string;
  };
  ip: string;
  isp: string;
  location: {
    country: string;
    region: string;
    city: string;
    geonameId: number;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
  };
};
mapboxgl.accessToken =
  "pk.eyJ1IjoiYnJpY2V2aWduYWwiLCJhIjoiY2syYTlqY2F0MGw1bTNtcGUza2c4OWdnZyJ9.IXoN76srzhVVYbSW_sEJng";
const map = new mapboxgl.Map({
  container: "map-box", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  zoom: 9, // starting zoom
});
const getIPAddress = async (ipAddress: string) => {
  try {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_y9dSnNma5DYgCifv1NIq0PVj6sFzG&ipAddress=${ipAddress}`
    );
    const result: AddressInfo = await response.json();
    const infoList = document.getElementsByClassName("info");
    const data = Object.values({
      ip: result.ip,
      location: result.location.city,
      timezone: `UTC ${result.location.timezone}`,
      isp: result.isp,
    });

    for (let i = 0; i <= infoList.length; i++) {
      if (document.getElementsByClassName("value").item(i) === null) {
        const h3 = document.createElement("h3");
        h3.classList.add("value");
        infoList.item(i)?.appendChild(h3);
        h3.textContent = `${data[i]}`;
      } else {
        document
          .getElementsByClassName("value")
          .item(i)!.textContent = `${data[i]}`;
      }
    }
    getMarkerByIPAddress(result);
  } catch (err) {
    console.log(err);
  }
};

const getMarkerByIPAddress = (addressInfo: AddressInfo) => {
  const el = document.createElement("div");
  el.className = "marker";
  const marker = new mapboxgl.Marker(el);
  map.setZoom(15);
  map.setCenter(
    [addressInfo.location.lng, addressInfo.location.lat] // starting position [lng, lat]
  );
  // make a marker for each feature and add to the map
  marker
    .setLngLat([addressInfo.location.lng, addressInfo.location.lat])
    .addTo(map);
};

const search = document.querySelector<HTMLInputElement>("#search");
const button = document.querySelector<HTMLButtonElement>("button");

search!.defaultValue = "192.212.174.101";
getIPAddress(search!.defaultValue);
button!.addEventListener("click", () => {
  const value = search!.value;
  getIPAddress(value);
});
