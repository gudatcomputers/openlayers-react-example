import { Map } from 'ol';
import BaseLayer from 'ol/layer/Base';

export default function mapLayerExists(map: Map, name: string):boolean {
  return !!map.getLayers().getArray().find((layer:BaseLayer) => layer.getProperties().name === name);
}
