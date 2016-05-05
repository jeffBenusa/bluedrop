$( document ).ready(function() {

  var socket = io.connect('http://45.55.237.122/');

  var southWest = L.latLng(40.369454, -96.853014),
      northEast = L.latLng(43.626029, -90.151354),
      bounds = L.latLngBounds(southWest, northEast);

  L.mapbox.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

  var map = L.mapbox.map('map', 'mapbox.streets', {
    maxBounds: bounds,
    maxZoom: 9,
    minZoom: 7
  });

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
    maxZoom: 13,
    id: 'mapbox.streets'
  }).addTo(map);

  var myLayer = L.mapbox.featureLayer().addTo(map);

   map.doubleClickZoom.disable();

  // These two fadeMaker & Timer work together to fade out the markers
  var fadeMarker = function(){
    $(".bluedrop").fadeOut(5000,function(){
      $(this).remove();
    });
  };
  var timer = setInterval(fadeMarker, 500);

  var greenIcon = L.icon({
    iconUrl: 'img/marker.png',
    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  var myIcon = L.icon({
  	iconUrl: 'img/marker.png',
  	iconSize: [50, 50],
  	iconAnchor: [25, 25],
    className: 'bluedrop'
  });


  socket.on('displayMarker', function(markerLatLng){
    L.marker(markerLatLng, {icon: myIcon}).addTo(map);
  });
});
