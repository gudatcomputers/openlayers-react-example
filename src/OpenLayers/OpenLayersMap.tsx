import { Coordinate } from 'ol/coordinate';
import React, { useEffect, useState } from 'react';
import { Zoom } from 'ol/control';
import { Map, View } from 'ol';
import MapContext from './MapContext';
import './styles/map.css';

type OpenLayersMapProps = {
  children: React.ReactNode,
  center: Coordinate
};

export default function OpenLayersMap(props: OpenLayersMapProps) {
  const { center, children } = props;
  const [mapRef] = useState<React.RefObject<HTMLDivElement>>(() => React.createRef<HTMLDivElement>());

  const [map] = useState<Map>(() => new Map({
    controls: [
      new Zoom({
        className: 'map-zoom-controls',
        zoomInClassName: 'map-zoom-in-button',
        zoomOutClassName: 'map-zoom-out-button',
      }),
    ],
    view: new View({
      projection: 'EPSG:3857',
      zoom: 14,
      center,
    }),
  }));

  useEffect(() => {
    if (map && !map.getTarget() && mapRef.current) {
      map.setTarget(mapRef.current);
    }
  }, [map, mapRef]);

  useEffect(() => {
    if (map) {
      map.getView().setCenter(center);
    }
  }, [map, center]);

  return (
    <MapContext.Provider value={map}>
      <div ref={mapRef} className="map-holder">
        {children}
      </div>
    </MapContext.Provider>
  );
}
