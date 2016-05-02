$( document ).ready(function() {

  var mouseLocation = [];

  L.mapbox.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

  var southWest = L.latLng(40.369454, -96.853014),
      northEast = L.latLng(43.626029, -90.151354),
      bounds = L.latLngBounds(southWest, northEast);


  var mymap = L.mapbox.map('map', 'mapbox.streets', {
    maxBounds: bounds,
    maxZoom: 9,
    minZoom: 7
  });


  // Disable interactivity
  mymap.dragging.disable();
  mymap.touchZoom.disable();
  mymap.doubleClickZoom.disable();
  mymap.scrollWheelZoom.disable();
  mymap.keyboard.disable();


  mymap.fitBounds(bounds);

  var myLayer = L.mapbox.featureLayer().addTo(mymap);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
    maxZoom: 13,
    id: 'mapbox.streets'
  }).addTo(mymap);

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
    communityClickedLatLng = [e.latlng.lat, e.latlng.lng];
    socket.emit('CommunityClicked', communityClickedLatLng)

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
      html:'<div><img class="BlueZoneVisit" src="img/marker.png"/></div>',
      // Set marker width and height
      iconSize: [-1, -1]
    });


    var marker;

    L.geoJson(geojsonFeature, {
      pointToLayer: function(feature, latlng){
        marker = L.marker(communityClickedLatLng, {
          icon: cssIcon,
          title: "Resource Location",
          alt: "Resource Location",
          riseOnHover: true,
          draggable: false,
          opacity:1,
        });
        return marker;
      }
    }).addTo(mymap);
  }

  var communityClicked= [];

  var socket = io.connect('http://localhost:3000/');

  $("#button").click(function(){
    socket.emit('message','I have been clicked');
    console.log("client clicked");
  });



  socket.on('displayMarker', function(markerLatLng){
    console.log(markerLatLng);

    var geojsonFeature = {
      "type": "Feature",
          "properties": {},
          "geometry": {
              "type": "Point",
              "coordinates": markerLatLng
            }
    }

    //Creates custom marker image with CSS Class / JQUERY targetable
    var cssIcon = L.divIcon({
    // Specify a class name we can refer to in CSS.
      className: 'css-icon',
      html:'<div><img class="BlueZoneVisit" src="img/marker.png"/></div>',
      // Set marker width and height
      iconSize: [-1, -1]
    });


    var marker;

    L.geoJson(geojsonFeature, {
      pointToLayer: function(feature, latlng){
        marker = L.marker(markerLatLng, {
          icon: cssIcon,
          title: "Resource Location",
          alt: "Resource Location",
          riseOnHover: true,
          draggable: false,
          opacity:1,
        });
        return marker;
      }
    }).addTo(mymap);

  });

});
