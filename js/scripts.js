var defaultCenter = [40.622813, -74.028282];
var defaultZoom = 17;

var map =
    L.map('my-map', {preferCanvas: true}).setView([40.731389,-73.992748], 11);
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
    	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    	subdomains: 'abcd',
    	maxZoom: 19,
    }).addTo(map);

var myRenderer = L.canvas({ padding: 0.5 });
// var controlLayers = L.control.layers().addTo(map);
var votinged = 'data/votingmini.geojson';

$.getJSON(votinged, function (geojson) {
  var geojsonLayer = L.geoJson(geojson, {style:style
      }).addTo(map);
  // controlLayers.addOverlay(geojsonLayer,'Election Districts');
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

  function style(feature) {
      return {
          fillColor: getColor(feature.properties.D),
          weight: .5,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.7
      };
  }

  var poolArray = []  // empty array
  pool_data.forEach(function(poolObject) {
    var latlon = [poolObject.Y, poolObject.X];
    var options = {
      renderer: myRenderer,
      radius: .4,
      stroke: false,
      fillColor: 'rgb(18, 84, 171)',
    };
  poolArray.push(L.circleMarker(latlon, options))
      });

var pools = LayerGroup = L.layerGroup(poolArray);

var Sectorslayer = {
  "Swimming Pools": pools,

};

L.control.layers(null,Sectorslayer,{collapsed:false}).addTo(map);
