import { ElementRef, Inject, Injectable } from '@angular/core';
import { Feature, Map as OlMap, Overlay } from 'ol';
import { MapOptions } from 'ol/PluggableMap';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import { baseLayers, MAP_OPTIONS } from './map-options';
import GeometryType from 'ol/geom/GeometryType';
import Draw from 'ol/interaction/Draw';
import { OurLayer } from './geoserver.service';
import VectorSource from 'ol/source/Vector';
import Select from 'ol/interaction/Select';
import { environment } from 'src/environments/environment';
import { transform } from 'ol/proj';
import Geolocation from 'ol/Geolocation';
import Point from 'ol/geom/Point';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map: OlMap | undefined;
  public popupOverlay: Overlay | undefined;
  private mapProjection = environment.geoserver.mapProjection;
  public baseLayers = baseLayers;
  public baseLayer = baseLayers[0];
  constructor(@Inject(MAP_OPTIONS) private options: MapOptions) {}

  createMap(): OlMap | undefined {
    this.map = new OlMap(this.options);
    return this.map;
  }

  setBaseLayer(layer: any) {
    this.baseLayer = layer;
    this.map?.getLayers().removeAt(0);
    this.map?.getLayers().insertAt(0, layer.value);
  }

  addGeolocation() {
    const geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: this.map?.getView().getProjection(),
      tracking: true,
    });
    geolocation.on('change:position', () => {
      const coordinates = geolocation.getPosition();
      this.map?.getView().setCenter(coordinates);
    });
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

  createOverlay(element: ElementRef, feature: Feature) {
    this.removeOverlay();
    element.nativeElement.innerHTML = this.generateHTML(feature);
    this.popupOverlay = new Overlay({
      element: element.nativeElement,
      offset: [9, 9],
    });
    this.map?.addOverlay(this.popupOverlay);
  }

  generateHTML(feature: Feature) {
    let html = '';
    Object.keys(feature.getProperties()).forEach((key) => {
      if (key !== 'the_geom') {
        const value = feature.getProperties()[key];
        html += `<b>${key}:</b> ${value} <br/>`;
      }
    });
    return html;
  }

  removeOverlay() {
    if (this.popupOverlay) {
      this.map?.removeOverlay(this.popupOverlay as Overlay);
    }
  }

  setCenterBasedOnLayer(layer: OurLayer) {
    const bounding = layer.value.nativeBoundingBox;
    const x = bounding.maxx - (bounding.maxx - bounding.minx) / 2;
    const y = bounding.maxy - (bounding.maxy - bounding.miny) / 2;
    this.map
      ?.getView()
      .setCenter(transform([x, y], layer.value.srs, this.mapProjection));
  }
}
