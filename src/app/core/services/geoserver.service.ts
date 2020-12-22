import { Injectable } from '@angular/core';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { all } from 'ol/loadingstrategy';
import { HttpClient } from '@angular/common/http';
import GeometryType from 'ol/geom/GeometryType';
import Style from 'ol/style/Style';
import { environment } from 'src/environments/environment';

export interface OurLayer {
  geoGSON: GeoJSON | null;
  geometryType: GeometryType | null;
  style: Style | null;
  source: VectorSource | null;
  layer: VectorLayer | null;
  value: any;
  name: string | null;
  activated: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GeoserverService {
  layers: {
    [key: string]: OurLayer;
  } = {};

  createGeoJSON(layerName: string) {
    const geoJSON = new GeoJSON({
      geometryName: `${environment.geoserver.workspace}:${layerName}`,
    });
    this.layers[layerName].geoGSON = geoJSON;
    return geoJSON;
  }

  createWFSSource(layerName: string) {
    const source = new VectorSource({
      strategy: all,
      format: this.createGeoJSON(layerName),
      loader: (extent) => {
        return this.http
          .get(
            `${environment.geoserver.url}/${environment.geoserver.workspace}/wfs`,
            {
              params: {
                service: 'WFS',
                version: '2.0.0',
                outputformat: 'application/json',
                request: 'GetFeature',
                typeName: `${environment.geoserver.workspace}:${layerName}`,
                srsname: environment.geoserver.projection,
              },
            }
          )
          .subscribe((result) => {
            const features = this.createGeoJSON(layerName).readFeatures(
              result,
              {
                dataProjection: environment.geoserver.projection,
                featureProjection: 'EPSG:3857',
              }
            );
            source.addFeatures(features);
          });
      },
    });
    this.layers[layerName].source = source;
    return source;
  }

  createWFSLayer(layerName: string, options?: { style?: Style }) {
    if (!this.layers[layerName]) {
      this.createLayer(layerName);
    }
    const layer = new VectorLayer({
      source: this.createWFSSource(layerName),
      style: options?.style,
    });
    this.layers[layerName].layer = layer;
    return this.layers[layerName];
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
      this.createWFSLayer(layer.name);
      this.layers[layer.name].value = layer;
      this.layers[layer.name].name = layer.name;
    });
    return Object.values(this.layers);
  }

  constructor(private http: HttpClient) {}
}
