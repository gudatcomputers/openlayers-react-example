import React from 'react';
import { fromLonLat } from 'ol/proj';
import OpenLayersMap from './OpenLayers/OpenLayersMap';
import Layers from './OpenLayers/components/Layers';
import './App.css';
import OpenLayersTileLayer from './OpenLayers/components/OpenLayersTileLayer';
import OpenLayersVectorLayer from './OpenLayers/components/OpenLayersVectorLayer';
import MapPopulator from './OpenLayers/components/MapPopulator';

function App() {
  return (
    <div>
      <header>
        OpenLayers React Example
      </header>
      <div className="map-container">
        <OpenLayersMap center={fromLonLat([-74.0060, 40.7128])}>
          <Layers>
            <OpenLayersTileLayer name="tile" zIndex={10} />
            <OpenLayersVectorLayer name="people" zIndex={22} />
          </Layers>
          <MapPopulator />
        </OpenLayersMap>
      </div>
    </div>
  );
}

export default App;
