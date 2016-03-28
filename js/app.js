$( document ).ready(function() {

  var mouseLocation = [];

  L.mapbox.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

  var mymap = L.map('map').setView([51.505, -0.09], 10);

  var myLayer = L.mapbox.featureLayer().addTo(mymap);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
    maxZoom: 13,
    id: 'mapbox.streets'
  }).addTo(mymap);


  // London center marker
  var marker = L.marker([51.5, -0.09]).addTo(myLayer);


  // Adding random marker
  $("#random_container").click(function(){
    addnewMarker();
  });

  function addnewMarker(){
      var lat = (50.2+(Math.random() * 0.5) + 1);
      var long = (-.39+(Math.random() * .75));
      var marker = L.marker([lat,long]).addTo(myLayer);
  }



  $('#map').on('load', function() {
    $(".trigger").fadeOut(1000);
    console.log("check");
  });


  // attaching function on map click
  mymap.on('click', onMapClick);

  // Script for adding marker on map click
  function onMapClick(e) {

    var geojsonFeature = {
      "type": "Feature",
          "properties": {},
          "geometry": {
              "type": "Point",
              "coordinates": [e.latlng.lat, e.latlng.lng]
            }
      }

    var cssIcon = L.divIcon({
    // Specify a class name we can refer to in CSS.
      className: 'css-icon',
      // Set marker width and height
      iconSize: [100, 100]
    });

    var marker;

    L.geoJson(geojsonFeature, {
    pointToLayer: function(feature, latlng){
        marker = L.marker(e.latlng, {
            icon: cssIcon,
            title: "Resource Location",
            alt: "Resource Location",
            riseOnHover: true,
            draggable: false,
            opacity:.8,
        }).bindPopup();
        //marker.on("popupopen", onPopupOpen);
        return marker;
    }}).addTo(mymap);
    }
});
