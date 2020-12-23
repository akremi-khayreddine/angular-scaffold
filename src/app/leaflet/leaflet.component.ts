import { Component, OnInit } from '@angular/core';
import {
  Map,
  latLng,
  tileLayer,
  MapOptions,
  FeatureGroup,
  Control,
} from 'leaflet';
import 'leaflet-draw';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LayersService } from '../core/services/layers.service';
import { LeafletService } from '../core/services/leaflet.service';

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.scss'],
})
export class LeafletComponent implements OnInit {
  options: MapOptions = {
    zoom: 10,
    center: latLng(36.677230602346214, 10.170593261718752)
  };
  layers: any[] = [
    tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '...',
    }),
  ];
  constructor(
    private layersService: LayersService,
    private service: LeafletService
  ) {}

  ngOnInit(): void {}

  onMapReady(map: Map) {
    this.layersService
      .list()
      .pipe(
        switchMap((layers: any[]) =>
          combineLatest(
            layers.map((layer) => this.service.createWFS(layer.name))
          )
        )
      )
      .subscribe((layers) => {
        layers.forEach((layer) => {
          layer.addTo(map);
        });
        var drawnItems = new FeatureGroup();
        map.addLayer(drawnItems);
        var drawControl = new Control.Draw({
          edit: {
            featureGroup: drawnItems
          }
        });
        map.addControl(drawControl);
      });
  }

  onClick(event: any) {
    console.log(event);
  }
}
