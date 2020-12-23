import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature } from 'ol';
import WFSFormat from 'ol/format/WFS';
import { transform } from 'ol/proj';
import { combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OurLayer } from './geoserver.service';

@Injectable({
  providedIn: 'root',
})
export class LayersService {
  private url = environment.geoserver.url;
  private workspace = environment.geoserver.workspace;
  private mapProjection = environment.geoserver.mapProjection;

  constructor(private http: HttpClient) {}

  list() {
    return this.http
      .get(`${this.url}/rest/workspaces/${this.workspace}/layers.json`, {
        headers: {
          Authorization: 'Basic ' + btoa('admin:geoserver'),
        },
      })
      .pipe(map((result: any) => (result.layers ? result.layers.layer : [])));
  }

  listWithFeatureTypes() {
    return this.list().pipe(
      switchMap((layers: any[]) => {
        return layers.length !== 0
          ? combineLatest(
              layers.map((layer: any) => this.featureTypes(layer.name))
            )
          : of([]);
      })
    );
  }

  getStyle(name: string) {
    return this.http
      .get(`${this.url}/rest/styles/${name}.json`, {
        headers: {
          Authorization: 'Basic ' + btoa('admin:geoserver'),
        },
      })
      .pipe(map((result: any) => result.style));
  }

  find(name: string) {
    return this.http
      .get(
        `${this.url}/rest/workspaces/${this.workspace}/layers/${name}.json`,
        {
          headers: {
            Authorization: 'Basic ' + btoa('admin:geoserver'),
          },
        }
      )
      .pipe(map((result: any) => result.layer));
  }

  featureTypes(name: string) {
    return this.http
      .get(
        `${this.url}/rest/workspaces/${this.workspace}/datastores/${name}/featuretypes/${name}.json`,
        {
          headers: {
            Authorization: 'Basic ' + btoa('admin:geoserver'),
          },
        }
      )
      .pipe(map((result: any) => result.featureType));
  }

  addFeature(layer: OurLayer, feature: Feature) {
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

  updateFeature(layer: OurLayer, feature: Feature) {
    const newFeature = feature.clone();
    const coords = (feature.getGeometry() as any).getCoordinates();
    const polyCoords = this.transformCoords(layer, coords);
    (newFeature.getGeometry() as any).setCoordinates([[polyCoords]]);
    const wfsFormat = new WFSFormat({
      featureNS: this.workspace,
      featureType: `${this.workspace}:${layer.name}`,
    });
    const node = wfsFormat.writeTransaction([], [newFeature], [], {
      featureNS: this.workspace,
      featurePrefix: '',
      featureType: `${this.workspace}:${layer.name}`,
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

  deleteFeature(layer: OurLayer, feature: Feature) {
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
