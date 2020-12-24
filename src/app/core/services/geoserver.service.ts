import { Injectable } from '@angular/core';
import GeoJSON from 'ol/format/GeoJSON';

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { all } from 'ol/loadingstrategy';
import { HttpClient } from '@angular/common/http';
import Style from 'ol/style/Style';
import { environment } from 'src/environments/environment';
import Fill from 'ol/style/Fill';
import { OurLayer } from '../models/OurLayer';

@Injectable({
  providedIn: 'root',
})
export class GeoserverService {
  private url = environment.geoserver.url;
  private workspace = environment.geoserver.workspace;
  private mapProjection = environment.geoserver.mapProjection;

  layers: {
    [key: string]: OurLayer;
  } = {};

  /**
   * Hack
   */
  styles: { [key: string]: Style } = {
    polygon: new Style({
      fill: new Fill({
        color: 'rgba(42, 40, 175, 0.5)',
      }),
    }),
    green: new Style({
      fill: new Fill({
        color: 'rgba(43, 147, 41, 0.5)',
      }),
    }),
  };

  createGeoJSON(layerName: string) {
    const geoJSON = new GeoJSON({
      geometryName: `${this.workspace}:${layerName}`,
    });
    this.layers[layerName].geoGSON = geoJSON;
    return geoJSON;
  }

  createWFSSource(layer: any) {
    const source = new VectorSource({
      strategy: all,
      format: this.createGeoJSON(layer.name),
      loader: (extent) => {
        return this.http
          .get(`${this.url}/${this.workspace}/wfs`, {
            params: {
              service: 'WFS',
              version: '2.0.0',
              outputformat: 'application/json',
              request: 'GetFeature',
              typeName: `${this.workspace}:${layer.name}`,
              srsname: layer.srs,
            },
          })
          .subscribe((result) => {
            const features = this.createGeoJSON(
              layer.name as string
            ).readFeatures(result, {
              dataProjection: layer.srs,
              featureProjection: this.mapProjection,
            });
            source.addFeatures(features);
          });
      },
    });
    this.layers[layer.name as string].source = source;
    return source;
  }

  createWFSLayer(layer: any, options?: { style?: Style }) {
    if (!this.layers[layer.name]) {
      this.createLayer(layer.name);
    }
    const vlayer = new VectorLayer({
      source: this.createWFSSource(layer),
      style: options?.style,
    });
    this.layers[layer.name].layer = vlayer;
    return this.layers[layer.name];
  }

  private createLayer(layerName: string) {
    this.layers[layerName] = {
      geoGSON: null,
      geometryType: null,
      layer: null,
      source: null,
      style: null,
      value: null,
      name: null,
      activated: true,
    };
  }

  init(layers: any[]): OurLayer[] {
    layers.forEach((layer) => {
      this.createWFSLayer(layer);
      this.layers[layer.name].value = layer;
      this.layers[layer.name].name = layer.name;
    });
    return Object.values(this.layers);
  }

  constructor(private http: HttpClient) {}
}
