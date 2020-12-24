```javascript
var googleLayerDefault = new Tile({
  source: new TileImage({
    url: 'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
  }),
});

var googleLayerRoadNames = new Tile({
  source: new TileImage({
    url: 'http://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}',
  }),
});

var googleLayerRoadmap = new Tile({
  source: new TileImage({
    url: 'http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
  }),
});

var googleLayerSatellite = new Tile({
  source: new TileImage({
    url: 'http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}',
  }),
});

var googleLayerHybrid = new Tile({
  source: new TileImage({
    url: 'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
  }),
});

var googleLayerTerrain = new Tile({
  source: new TileImage({
    url: 'http://mt1.google.com/vt/lyrs=t&x={x}&y={y}&z={z}',
  }),
});

var googleLayerHybrid2 = new Tile({
  source: new TileImage({
    url: 'http://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
  }),
});

var googleLayerOnlyRoad = new Tile({
  source: new TileImage({
    url: 'http://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
  }),
});
``