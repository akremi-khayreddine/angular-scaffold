import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Feature, Map as OlMap } from 'ol';
import GeometryType from 'ol/geom/GeometryType';
import VectorLayer from 'ol/layer/Vector';

import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { GeoserverService, OurLayer } from '../core/services/geoserver.service';
import { MapService } from '../core/services/map.service';
import { LayersService } from '../core/services/layers.service';
import { FeaturesService } from '../core/services/features.service';

export interface CurrentInteraction {
  key: string | null;
  value: any | null;
}

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {
  map: OlMap | undefined;

  apiLayers: OurLayer[] = [];

  layers$ = new BehaviorSubject<OurLayer[]>([]);

  currentInteraction: CurrentInteraction = {
    key: null,
    value: null,
  };

  selectedData: {
    layer: OurLayer | null;
    feature: Feature | null;
  } = {
    layer: null,
    feature: null,
  };

  @ViewChild('popup') popup: ElementRef | undefined;

  get activatedLayers() {
    return this.layers$.pipe(
      map((layers) => {
        return layers
          .filter((layer) => layer.activated)
          .map((layer) => layer.layer);
      })
    );
  }

  constructor(
    private dialog: MatDialog,
    private geoserver: GeoserverService,
    public mapService: MapService,
    private layersService: LayersService,
    private featuresService: FeaturesService
  ) {}

  ngOnInit(): void {
    this.layersService
      .listWithFeatureTypes()
      .pipe(map((layers) => this.geoserver.init(layers)))
      .subscribe((layers) => {
        this.apiLayers = layers;
        this.map = this.mapService.createMap();
        const defaultLayer = layers.find(
          (l) => l.name === 'TUN_adm1'
        ) as OurLayer;
        this.mapService.setCenterBasedOnLayer(defaultLayer);
        layers.forEach((layer) => {
          this.layers$.next([...this.layers$.value, layer]);
        });
      });
    this.activatedLayers.subscribe((layers) => {
      this.layers$.value.map((layer) => {
        this.map?.removeLayer(layer.layer as VectorLayer);
      });
      layers.map((layer) => {
        this.map?.addLayer(layer as VectorLayer);
      });
    });
  }

  onSelect() {
    this.removeCurrentInteraction();
    const interaction = this.mapService.createSelectInteraction();
    interaction.on('select', (event) => {
      if (event.selected.length !== 0) {
        const feature = event.selected[0];
        const workspace = feature.getGeometryName().split(':')[0];
        const layerName = feature.getGeometryName().split(':')[1];
        const layer = this.apiLayers.find(
          (l) => l.name === layerName
        ) as OurLayer;
        /*
        this.mapService.createOverlay(this.popup as ElementRef, feature);
        this.mapService.popupOverlay?.setPosition(
          event.mapBrowserEvent.coordinate
        );
        */
        this.selectedData = { layer, feature };
      } else {
        this.mapService.removeOverlay();
      }
    });
    this.currentInteraction = { key: 'select', value: interaction };
    this.map?.addInteraction(interaction);
  }

  onDelete() {
    this.mapService.removeOverlay();
    this.removeCurrentInteraction();
    const interaction = this.mapService.createSelectInteraction();
    interaction.on('select', (event) => {
      if (event.selected.length !== 0) {
        const feature = event.selected[0];
        const workspace = feature.getGeometryName().split(':')[0];
        const layerName = feature.getGeometryName().split(':')[1];
        const layer = this.apiLayers.find(
          (l) => l.name === layerName
        ) as OurLayer;
        this.featuresService.delete(layer, feature).subscribe(() => {
          layer.source?.refresh();
        });
      }
    });
    this.currentInteraction = { key: 'delete', value: interaction };
    this.map?.addInteraction(interaction);
  }

  onDrawPolygon(layer: OurLayer) {
    this.mapService.removeOverlay();
    this.removeCurrentInteraction();
    const interaction = this.mapService.createDrawInteraction(
      GeometryType.MULTI_POLYGON,
      layer
    );
    interaction.on('drawend', (event) => {
      this.openForm({ layer, feature: event.feature, mode: 'create' });
    });
    this.currentInteraction = { key: 'polygon', value: interaction };
    this.map?.addInteraction(interaction);
  }

  onDrawPoint(layer: OurLayer) {
    this.mapService.removeOverlay();
    this.removeCurrentInteraction();
    const interaction = this.mapService.createDrawInteraction(
      GeometryType.POINT,
      layer
    );
    interaction.on('drawend', (event) => {
      this.openForm({ layer, feature: event.feature, mode: 'create' });
    });
    this.currentInteraction = { key: 'point', value: interaction };
    this.map?.addInteraction(interaction);
  }

  removeCurrentInteraction() {
    if (this.currentInteraction.value) {
      this.map?.removeInteraction(this.currentInteraction.value);
    }
  }

  close() {
    this.selectedData = { layer: null, feature: null };
  }

  toggle(layer: any, checked: boolean) {
    this.layers$.next(
      this.layers$.value.map((l) => {
        if (l.name === layer.name) {
          l.activated = checked;
        }
        return l;
      })
    );
  }

  openForm(options: {
    layer: OurLayer;
    feature: Feature;
    mode: 'show' | 'create';
  }) {
    const ref = this.dialog.open(FormComponent, {
      data: options,
      width: '400px',
    });
    ref.afterClosed().subscribe((result) => {
      if (result) {
        options.feature.setProperties(result.form);
        this.featuresService
          .add(options.layer, options.feature)
          .subscribe((result) => {
            options.layer.source?.refresh();
          });
      } else {
        options.layer.source?.refresh();
      }
    });
  }
}
