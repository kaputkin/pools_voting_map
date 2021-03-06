var southWest = L.latLng(40.294192, -74.842987),
    northEast = L.latLng(41.248903, -73.108521),
    mybounds = L.latLngBounds(southWest, northEast);

var map =
    new L.Map('mymap', {
      center: [40.723435,-74.1],
      zoom: 11,
      maxBounds: mybounds,
    });

    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
    	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    	subdomains: 'abcd',
      minZoom: 8,
    	maxZoom: 14,
      bounds: mybounds
    }).addTo(map);


map.createPane('ED');
map.createPane('Pools');
map.getPane('ED').style.zIndex =300;
map.getPane('Pools').style.zIndex = 600;
map.getPane('Pools').style.pointerEvents = 'none';

// var myRenderer = L.canvas({ padding: 0.5 });
var votinged = 'data/votingmini.geojson';
// var pools = 'data/pools.geojson';

$.getJSON(votinged, function (geojson){
  var geojsonLayer = L.geoJson(geojson, {style:style,
  onEachFeature: function(feature,layer){
    layer.bindPopup(`${feature.properties.D}% voted for Trump in this district with ${feature.properties.P} private pools`, {
      closeButton: false,
      minWidth: 60,
      offset: [0, -10]
    });
    layer.on('mouseover', function (e) {
      this.openPopup();

      e.target.setStyle({
        weight: 3,
        color: '#FFF',
      });
    });
    layer.on('mouseout', function (e) {
      this.closePopup();
      geojsonLayer.resetStyle(e.target);
    });
  }}).addTo(map);
});

  function getColor(x) {
      return x < 10   ? '#fef0d9':
             x < 20   ? '#fee0b6':
             x < 30   ? '#fed093':
             x < 40   ? '#fdb77a' :
             x < 50   ? '#fd9b64' :
             x < 60   ? '#f77e50' :
             x < 70   ? '#ec603f' :
             x < 80   ? '#de422d' :
             x < 90   ? '#c92116' :
             x < 100  ? '#b30000' :
                        'grey';
}

  function style(feature) {
      return {
          fillColor: getColor(feature.properties.D),
          weight: 1,
          opacity: 1,
          color: getColor(feature.properties.D),
          fillOpacity: .8,
          pane: 'ED',
      };
  }


var poollayer = L.tileLayer('data/data/{z}/{x}/{y}.png', {
      minZoom: 8,
      maxZoom: 14,
      bounds: mybounds,
      pane: 'Pools'
      }).addTo(map);


//   var poolArray = []  // empty array
//   pool_data.forEach(function(poolObject) {
//     var latlon = [poolObject.Y, poolObject.X];
//     var options = {
//       renderer: myRenderer,
//       radius: 2,
//       stroke: false,
//       fillOpacity: .1,
//       fillColor: '#1254ab',
//       pane:'Pools',
//     };
//   poolArray.push(L.circleMarker(latlon, options))
// });
//
// var pools = L.featureGroup().addTo(map);

var Sectorslayer = {
  "Swimming Pools": poollayer,

};

L.control.layers(null,Sectorslayer,{collapsed:false, position: 'topright'}).addTo(map);
