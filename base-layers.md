```javascript
const googleLayerDefault = new Tile({
  source: new TileImage({
    url: 'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
  }),
});

const googleLayerRoadNames = new Tile({
  source: new TileImage({
    url: 'http://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}',
  }),
});

const googleLayerRoadmap = new Tile({
  source: new TileImage({
    url: 'http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
  }),
});

const googleLayerSatellite = new Tile({
  source: new TileImage({
    url: 'http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}',
  }),
});

const googleLayerHybrid = new Tile({
  source: new TileImage({
    url: 'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
  }),
});

const googleLayerTerrain = new Tile({
  source: new TileImage({
    url: 'http://mt1.google.com/vt/lyrs=t&x={x}&y={y}&z={z}',
  }),
});

const googleLayerHybrid2 = new Tile({
  source: new TileImage({
    url: 'http://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
  }),
});

const googleLayerOnlyRoad = new Tile({
  source: new TileImage({
    url: 'http://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
  }),
});
``