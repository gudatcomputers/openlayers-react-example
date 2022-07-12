import { useContext, useEffect } from 'react';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import MapContext from '../MapContext';
import mapLayerExists from '../helpers/mapLayerExists';

export default function OpenLayersTileLayer({ name, zIndex }: { name: string, zIndex:number }) {
  const map = useContext(MapContext);
  useEffect(() => {
    if (!map || mapLayerExists(map, name)) {
      return;
    }

    map.addLayer(
      new TileLayer({
        source: new XYZ({
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        }),
        maxZoom: 19,
        properties: {
          name,
        },
        zIndex,
      }),
    );
  }, [map]);

  return null;
}
