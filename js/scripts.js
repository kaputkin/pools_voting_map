var map =
    L.map('mymap', {preferCanvas: true}).setView([40.732568, -74.082140], 11);
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
    	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    	subdomains: 'abcd',
    	maxZoom: 19,
    }).addTo(map);

map.createPane('ED');
map.getPane('ED').style.zIndex = 200;

var myRenderer = L.canvas({ padding: 0.5 });
var votinged = 'data/votingmini.geojson';

$.getJSON(votinged, function (geojson) {
  var geojsonLayer = L.geoJson(geojson, {style:styleED
  }).addTo(map).bindPopup(feature.properties.D);
});


  function getColor(x) {
      return x < 10   ? '#fef0d9':
             x < 20   ? '#fee0b6':
             x < 30   ? '#fed093':
             x < 40   ? '#fdb77a' :
             x < 50   ? '#fd9b64' :
             x < 60   ? '#f77e50' :
             x < 70  ? '#ec603f' :
             x < 80  ? '#de422d' :
             x < 90  ? '#c92116' :
             x < 100 ? '#b30000' :
                        'grey';
}

  function styleED(feature) {
      return {
          fillColor: getColor(feature.properties.D),
          weight: .5,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.7,
          pane: 'ED',
      };
  }

  var poolArray = []  // empty array
  pool_data.forEach(function(poolObject) {
    var latlon = [poolObject.Y, poolObject.X];
    var options = {
      renderer: myRenderer,
      radius: 2,
      stroke: false,
      fillOpacity: .1,
      fillColor: '#1254ab'
    };
  poolArray.push(L.circleMarker(latlon, options))

  // map.on('zoomend', function() {
  //   var currentZoom = map.getZoom();
  //   options.setRadius(currentZoom);
});

var pools = L.layerGroup(poolArray).addTo(map);

var Sectorslayer = {
  "Swimming Pools": pools,
};

L.control.layers(null,Sectorslayer,{collapsed:false, position: 'topright'}).addTo(map);
