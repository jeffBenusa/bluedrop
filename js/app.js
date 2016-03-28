$( document ).ready(function() {

  L.mapbox.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

  var mymap = L.map('map').setView([51.505, -0.09], 10);

  var myLayer = L.mapbox.featureLayer().addTo(mymap);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
    maxZoom: 13,
    id: 'mapbox.streets'
  }).addTo(mymap);

  var marker = L.marker([51.5, -0.09]).addTo(myLayer);


  // Random marker below
  console.log("Random location close to 51.50");
  console.log(50.2+(Math.random() * 0.5) + 1);
  var lat = (50.2+(Math.random() * 0.5) + 1);

  console.log("Random location near -0.09");
  console.log(.02+(Math.random() * 0.05) + .01);
  var long = (-.39+(Math.random() * .75));

  var marker = L.marker([lat,long]).addTo(myLayer);

  $("#random_container").click(function(){
    addnewMarker();
  });


  function addnewMarker(){
      console.log("Random location close to 51.50");
      console.log(50.2+(Math.random() * 0.5) + 1);
      var lat = (50.2+(Math.random() * 0.5) + 1);

      console.log("Random location near -0.09");
      console.log(.02+(Math.random() * 0.05) + .01);
      var long = (-.39+(Math.random() * .75));

      var marker = L.marker([lat,long]).addTo(myLayer);
}
});

  // var mymap = L.map('map').setView([51.505, -0.09], 10);
  // var myLayer = L.mapbox.featureLayer().addTo(mymap);
  // var marker = L.marker([51.5, -0.09]).addTo(myLayer);
