import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { geoJSON } from 'leaflet';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LeafletService {
  constructor(private http: HttpClient) {}

  createWFS(layerName: string) {
    return this.http
      .get(
        `${environment.geoserver.url}/${environment.geoserver.workspace}/ows`,
        {
          params: {
            service: 'WFS',
            version: '1.0.0',
            outputformat: 'application/json',
            request: 'GetFeature',
            typeName: `${environment.geoserver.workspace}:${layerName}`,
            srsname: 'EPSG:4326',
          },
        }
      )
      .pipe(
        map((result: any) =>
          geoJSON(result, {
            onEachFeature: function (feature, layer) {
              let text = '';
              Object.keys(feature.properties).forEach((key) => {
                text = `${text} ${key}: ${feature.properties[key]}`;
              });
              const popupOptions = { maxWidth: 200 };
              layer.bindPopup(text, popupOptions);
            },
          })
        )
      );
  }
}
