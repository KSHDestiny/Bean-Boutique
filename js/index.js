var map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-87.3923, 46.5418]),
    zoom: 15,
  }),
});

var marker = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([-87.3923, 46.5418])),
});

var markerStyle = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.5, 1],
    src: "../images/pin.png",
  }),
});
marker.setStyle(markerStyle);

var vectorLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [marker],
  }),
});

map.addLayer(vectorLayer);
