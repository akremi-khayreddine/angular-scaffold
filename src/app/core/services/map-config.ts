import { View } from 'ol';
import { MapOptions } from 'ol/PluggableMap';
import OSM from 'ol/source/OSM';
import Tile from 'ol/layer/Tile';
 
const osmBaseLayer = new Tile({
  source: new OSM(),
});

export const config: MapOptions = {
  target: 'olmap',
  view: new View({
    center: [0, 0],
    zoom: 5,
  }),
  layers: [osmBaseLayer],
};
