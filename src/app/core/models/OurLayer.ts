import GeoJSON from 'ol/format/GeoJSON';
import GeometryType from 'ol/geom/GeometryType';
import Style from 'ol/style/Style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

export interface OurLayer {
  geoGSON: GeoJSON | null;
  geometryType: GeometryType | null;
  style: Style | null;
  source: VectorSource | null;
  layer: VectorLayer | null;
  value: any;
  name: string | null;
  activated: boolean;
}
