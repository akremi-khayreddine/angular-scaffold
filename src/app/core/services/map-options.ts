import { View } from 'ol';
import { MapOptions } from 'ol/PluggableMap';
import BingMaps from 'ol/source/BingMaps';
import Tile from 'ol/layer/Tile';
import TileImage from 'ol/source/TileImage';
import OSM from 'ol/source/OSM';
import { InjectionToken } from '@angular/core';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';

proj4.defs('EPSG:32632', '+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs');
proj4.defs(
  'EPSG:22332',
  '+proj=utm +zone=32 +a=6378249.2 +b=6356515 +towgs84=-263,6,431,0,0,0,0 +units=m +no_defs'
);
register(proj4);

export const MAP_OPTIONS = new InjectionToken<MapOptions>('Map options');

export const imagerySets: string[] = ['AerialWithLabelsOnDemand', 'Road'];

export const googleLayerDefault = new Tile({
  source: new TileImage({
    url: 'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
  }),
});

const googleLayerSatellite = new Tile({
  source: new TileImage({
    url: 'http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}',
  }),
});

export const bingBaseLayer = new Tile({
  source: new BingMaps({
    key: 'AnSCOOEsLCAPPbQUJI2z5HWumUX4pdaIPAds92fkJ7dSy6BueeHISFZ9Xq_NvvbP',
    imagerySet: imagerySets[0],
  }),
});

export const osmBaseLayer = new Tile({
  source: new OSM(),
});

export const baseLayers = [
  { name: 'Google default', value: googleLayerDefault },
  { name: 'Google Satellite', value: googleLayerSatellite },
  { name: 'Bing AerialWithLabelsOnDemand', value: bingBaseLayer },
  { name: 'Openstreet', value: osmBaseLayer },
];

export const view = new View({
  center: [0, 0],
  zoom: 7,
});

export const mapOptions: MapOptions = {
  target: 'map',
  layers: [googleLayerDefault],
  view,
};
