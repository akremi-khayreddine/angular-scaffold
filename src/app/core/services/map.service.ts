import { Inject, Injectable } from '@angular/core';
import { Map as OlMap } from 'ol';
import { MapOptions } from 'ol/PluggableMap';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import { MAP_OPTIONS } from './map-options';
import GeometryType from 'ol/geom/GeometryType';
import Draw from 'ol/interaction/Draw';
import { OurLayer } from './geoserver.service';
import VectorSource from 'ol/source/Vector';
import Select from 'ol/interaction/Select';
import { environment } from 'src/environments/environment';
import { transform } from 'ol/proj';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map: OlMap | undefined;
  constructor(@Inject(MAP_OPTIONS) private options: MapOptions) {}

  createMap(): OlMap | undefined {
    this.map = new OlMap(this.options);
    return this.map;
  }

  createSelectInteraction() {
    const interaction = new Select();
    return interaction;
  }

  createDrawInteraction(type: GeometryType, layer: OurLayer) {
    const interaction = new Draw({
      type,
      source: layer.source as VectorSource,
      geometryName: 'the_geom',
    });
    return interaction;
  }

  createStyle(options: { fill: string; stroke: string }) {
    return new Style({
      fill: new Fill({
        color: options.fill,
      }),
      stroke: new Stroke({
        color: options.stroke,
      }),
    });
  }

  setCenterBasedOnLayer(layer: OurLayer) {
    const bounding = layer.value.nativeBoundingBox;
    const x = bounding.maxx - (bounding.maxx - bounding.minx) / 2;
    const y = bounding.maxy - (bounding.maxy - bounding.miny) / 2;
    this.map
      ?.getView()
      .setCenter(
        transform([x, y], environment.geoserver.projection, 'EPSG:3857')
      );
  }
}
