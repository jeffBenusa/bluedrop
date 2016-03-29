$( document ).ready(function() {

  var mouseLocation = [];

  L.mapbox.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

  var southWest = L.latLng(-0.412271, 51.381054),
      northEast = L.latLng(0.152448, 51.657928),
      bounds = L.latLngBounds(southWest, northEast);

  var mymap = L.map('map').setView([51.505, -0.09], 10);
  mymap.fitbounds = bounds;

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


  // These two fadeMaker & Timer work together to fade out the markers
  var fadeMarker = function(){
    $(".BlueZoneVisit").fadeOut(1000,function(){
      $(this).parent().parent().remove();
    });
  };
  var timer = setInterval(fadeMarker, 500);


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

    //Creates custom marker image with CSS Class / JQUERY targetable
    var cssIcon = L.divIcon({
    // Specify a class name we can refer to in CSS.
      className: 'css-icon',
      html:'<div><img class="BlueZoneVisit" src="marker.png"/></div>',
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
            opacity:1,
        });
        //marker.on("popupopen", onPopupOpen);
        return marker;
    }}).addTo(mymap);
    }

    // $(".BlueZoneVisit").click(function(){
    //
    //     console.log("test");
    // });
});
