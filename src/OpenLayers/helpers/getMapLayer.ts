import { Map } from 'ol';
import BaseLayer from 'ol/layer/Base';

export default function getMapLayer<T extends BaseLayer>(map: Map, name: string):T {
  const layer = map.getLayers().getArray().find((l:BaseLayer) => l.getProperties().name === name);

  if (!layer) {
    throw new Error(`unable to get map layer with name ${name}`);
  }

  return layer as T;
}
