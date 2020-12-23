import { Component, OnDestroy, OnInit } from '@angular/core';
import { config } from '../core/services/map-config';
import { Map } from 'ol';
import { LayersService } from '../core/services/layers.service';

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { all } from 'ol/loadingstrategy';
import GeoJSON from 'ol/format/GeoJSON';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { GeoserverService, OurLayer } from '../core/services/geoserver.service';

@Component({
  selector: 'app-maps-preview',
  templateUrl: './maps-preview.component.html',
  styleUrls: ['./maps-preview.component.scss'],
})
export class MapsPreviewComponent implements OnInit, OnDestroy {
  map: Map | undefined;

  /**
   * 1
   */
  constructor(
    private layersService: LayersService,
    private geoserverService: GeoserverService
  ) {}

  /***
   * 2
   */
  ngOnInit(): void {
    this.layersService
      .listWithFeatureTypes()
      .pipe(map((layers) => this.geoserverService.init(layers)))
      .subscribe((layers: OurLayer[]) => {
        this.map = new Map(config);
        layers.forEach((layer) => {
          this.map?.addLayer(layer.layer as VectorLayer);
        });
      });
  }

  /**
   * 3
   */
  ngOnDestroy() {}
}
