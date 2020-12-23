import { HttpClient } from '@angular/common/http';
import { Feature } from 'ol';
import { environment } from 'src/environments/environment';
import { OurLayer } from './geoserver.service';
import WFSFormat from 'ol/format/WFS';
import { transform } from 'ol/proj';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FeaturesService {
  private url = environment.geoserver.url;
  private workspace = environment.geoserver.workspace;
  private mapProjection = environment.geoserver.mapProjection;

  constructor(private http: HttpClient) {}
  add(layer: OurLayer, feature: Feature) {
    const newFeature = feature.clone();
    const fid = layer.source?.getFeatures().length;
    newFeature.setId(fid);
    const coords = (feature.getGeometry() as any).getCoordinates();
    const polyCoords = this.transformCoords(layer, coords);
    (newFeature.getGeometry() as any).setCoordinates([[polyCoords]]);
    const wfsFormat = new WFSFormat({
      featureNS: this.workspace,
      featureType: `${this.workspace}:${layer.name}`,
    });
    const node = wfsFormat.writeTransaction([newFeature], [], [], {
      featureNS: this.workspace,
      featurePrefix: '',
      featureType: layer.name as string,
      nativeElements: [],
    });
    return this.http.post(
      `${this.url}/${this.workspace}/wfs`,
      new XMLSerializer().serializeToString(node),
      {
        headers: {
          'Data-Type': 'xml',
          'Content-Type': 'text/xml',
          Authorization: 'Basic ' + btoa('admin:geoserver'),
        },
        responseType: 'text',
      }
    );
  }

  delete(layer: OurLayer, feature: Feature) {
    const wfsFormat = new WFSFormat({
      featureNS: this.workspace,
      featureType: `${this.workspace}:${layer.name}`,
    });
    const node = wfsFormat.writeTransaction([], [], [feature], {
      featureNS: this.workspace,
      featurePrefix: '',
      featureType: layer.name as string,
      nativeElements: [],
    });
    return this.http.post(
      `${this.url}/${this.workspace}/wfs`,
      new XMLSerializer().serializeToString(node),
      {
        headers: {
          'Data-Type': 'xml',
          'Content-Type': 'text/xml',
          Authorization: 'Basic ' + btoa('admin:geoserver'),
        },
        responseType: 'text',
      }
    );
  }

  private transformCoords(layer: OurLayer, coords: any) {
    var polyCoords = [];
    for (var i in coords[0][0]) {
      var c = coords[0][0][i];
      polyCoords.push(
        transform(
          [parseFloat(c[0]), parseFloat(c[1])],
          this.mapProjection,
          layer.value.srs
        )
      );
    }
    return polyCoords;
  }
}
