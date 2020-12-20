import { Component, OnInit } from '@angular/core';

import { Feature, Map as OlMap } from 'ol';
import View from 'ol/View';
import GeometryType from 'ol/geom/GeometryType';

import Tile from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';

import VectorSource from 'ol/source/Vector';
import BingMaps from 'ol/source/BingMaps';

import Draw from 'ol/interaction/Draw';
import Select from 'ol/interaction/Select';

import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface OurFeature {
  feature: Feature | undefined;
  description: string | null;
}

export interface OurLayer {
  name: string;
  activated: boolean;
  value: VectorLayer;
}

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

  baseLayer = new Tile({
    source: new BingMaps({
      key: 'AnSCOOEsLCAPPbQUJI2z5HWumUX4pdaIPAds92fkJ7dSy6BueeHISFZ9Xq_NvvbP',
      imagerySet: 'AerialWithLabelsOnDemand',
    }),
  });

  poligonLayer = new VectorLayer({
    source: new VectorSource(),
  });

  pointLayer = new VectorLayer({
    source: new VectorSource(),
  });

  layers = new BehaviorSubject([
    {
      activated: true,
      value: this.poligonLayer,
      name: 'polygon',
    },
    {
      activated: true,
      value: this.pointLayer,
      name: 'point',
    },
  ]);

  view = new View({
    center: [1132153.0768140366, 4415740.73565199],
    zoom: 18,
  });

  selectInteraction = new Select();

  drawInteraction = new Draw({
    type: GeometryType.MULTI_POLYGON,
    source: this.poligonLayer.getSource(),
    geometryName: 'the_geom',
  });

  pointIteraction = new Draw({
    type: GeometryType.POINT,
    source: this.pointLayer.getSource(),
    geometryName: 'the_geom',
  });

  features = new Map<number, OurFeature>();

  currentInteraction: CurrentInteraction = {
    key: null,
    value: null,
  };

  get activatedLayers() {
    return this.layers.pipe(
      map((layers) => {
        return layers
          .filter((layer) => layer.activated)
          .map((layer) => layer.value);
      })
    );
  }

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.map = new OlMap({
      target: 'map',
      layers: [this.baseLayer],
      view: this.view,
    });
    this.activatedLayers.subscribe((layers) => {
      this.layers.value.map((layer) => {
        this.map?.removeLayer(layer.value);
      });
      layers.map((layer) => {
        this.map?.addLayer(layer);
      });
    });
    this.selectInteraction.on('select', (event) => {
      if (event.selected.length !== 0) {
        this.openForm(this.features.get(event.selected[0].getId() as number));
      }
    });

    this.drawInteraction.on('drawend', (event) => {
      const feature = event.feature;
      feature.setId(this.features.size + 1);
      this.features.set(feature.getId() as number, {
        feature,
        description: null,
      });
      this.openForm({ feature, description: null });
    });

    this.pointIteraction.on('drawend', (event) => {
      const feature = event.feature;
      feature.setId(this.features.size + 1);
      this.features.set(feature.getId() as number, {
        feature,
        description: null,
      });
      this.openForm({ feature, description: null });
    });
  }

  onSelect() {
    this.removeCurrentInteraction();
    this.currentInteraction = { key: 'select', value: this.selectInteraction };
    this.map?.addInteraction(this.selectInteraction);
  }

  onDraw() {
    this.removeCurrentInteraction();
    this.currentInteraction = { key: 'polygon', value: this.drawInteraction };
    this.map?.addInteraction(this.drawInteraction);
  }

  onDrawPoint() {
    this.removeCurrentInteraction();
    this.currentInteraction = { key: 'point', value: this.pointIteraction };
    this.map?.addInteraction(this.pointIteraction);
  }

  removeCurrentInteraction() {
    if (this.currentInteraction.value) {
      this.map?.removeInteraction(this.currentInteraction.value);
    }
  }

  toggle(layer: any, checked: boolean) {
    this.layers.next(
      this.layers.value.map((l) => {
        if (l.name === layer.name) {
          l.activated = checked;
        }
        return l;
      })
    );
  }

  openForm(feature: OurFeature | undefined) {
    const ref = this.dialog.open(FormComponent, {
      data: feature?.description,
      width: '400px',
    });
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.features.set(feature?.feature?.getId() as number, {
          feature: feature?.feature,
          description: result,
        });
      }
    });
  }
}
