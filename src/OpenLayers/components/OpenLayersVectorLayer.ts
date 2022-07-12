import { useContext, useEffect } from 'react';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import MapContext from '../MapContext';
import mapLayerExists from '../helpers/mapLayerExists';

export default function OpenLayersVectorLayer({ name, zIndex }: { name: string, zIndex:number }) {
  const map = useContext(MapContext);
  useEffect(() => {
    if (!map || mapLayerExists(map, name)) {
      return;
    }

    map.addLayer(
      new VectorLayer<any>({
        properties: {
          name,
        },
        source: new VectorSource<any>(),
        style: new Style({
          stroke: new Stroke({
            color: 'red',
            width: 3,
          }),
          fill: new Fill({
            color: 'black',
          }),
        }),
        zIndex,
      }),
    );
  }, [map]);

  return null;
}
