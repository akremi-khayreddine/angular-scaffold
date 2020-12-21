import { Injectable } from '@angular/core';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { bbox } from 'ol/loadingstrategy';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GeoserverService {
  url = 'http://localhost:8080/geoserver';
  workspace = 'urbupdate';
  featureNs = 'http:/urbupdate';
  projection = 'EPSG:32632';

  layers = {
    Mhamdia: {
      geoGSON: '',
      geometryType: '',
      styles: '',
      source: '',
      layer: '',
    },
  };

  createGeoJSON(layerName: string) {
    return new GeoJSON({
      geometryName: `${this.workspace}:${layerName}`,
    });
  }

  createWFSSource(layerName: string) {
    const source = new VectorSource({
      strategy: bbox,
      format: this.createGeoJSON(layerName),
      loader: (extent) => {
        return this.http
          .get(`${this.url}/${this.workspace}/wfs`, {
            params: {
              service: 'WFS',
              version: '2.0.0',
              outputformat: 'application/json',
              request: 'GetFeature',
              typeName: `${this.workspace}:${layerName}`,
              srsname: this.projection,
              //bbox: extent.join(',')
            },
          })
          .subscribe((result) => {
            const features = this.createGeoJSON('Mhamdia').readFeatures(
              result,
              {
                dataProjection: this.projection,
                featureProjection: 'EPSG:3857',
              }
            );
            source.addFeatures(features);
            console.log(features);
          });
      },
    });
    return source;
  }

  createWFSLayer(layerName: string) {
    return new VectorLayer({
      source: this.createWFSSource(layerName),
    });
  }

  constructor(private http: HttpClient) {}
}
