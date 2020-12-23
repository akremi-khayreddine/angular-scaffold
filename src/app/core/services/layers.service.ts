import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
}
