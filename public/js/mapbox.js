"use strict";

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoianVkeXNzcyIsImEiOiJja3dlNHQyc2EwMWJrMnBtanQwdGpid28xIn0.OQNzn3I-HM5EwW4mVK8mHg";
// Mapbox Docs example - https://docs.mapbox.com/mapbox-gl-js/example/simple-map/

// This function is run on window 'load' event, once all scripts in the html file are loaded
const main = () => {
  // Set the Mapbox API access token
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

  const map = new mapboxgl.Map({
    container: "map", // container id
    center: [2.0787281, 41.3948976], // starting position [lng, lat]
    zoom: 12, // starting zoom
    style: 'mapbox://styles/mapbox/streets-v11'

    /* More details on setting the map styles:
      https://docs.mapbox.com/mapbox-gl-js/examples/#styles
    */
  });

  // Retrieves the geolocation using the browser's Navigator API
  // Docs: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var pos = [position.coords.longitude, position.coords.latitude];
        map.setCenter(pos);
      },
      () => alert("Issue retrieving your location")
    );
  } else {
    alert(" Your browser doesn't support Geolocation");
  }

  // Make an HTTP GET request back to our server from the view to get the list of all the restaurants
  // We use axios to make the HTTP request, but this can be done with `fetch()` as well
  axios
    .get("http://localhost:9999/jobs/display-all")
    .then((response) => {
    const allJobs = response.data;
    console.log(allJobs);
      allJobs.forEach((job) => {
        new mapboxgl.Marker()
          .setLngLat(job.location.coordinates) 
          .addTo(map);
      });
    })
    .catch((err) => console.error(err));
};

window.addEventListener("load", main);