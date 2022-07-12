import React, { ReactElement } from 'react';
import { Map } from 'ol';
import { render } from '@testing-library/react';
import BaseLayer from 'ol/layer/Base';
import OpenLayersMap from '../OpenLayersMap';
import MapContext from '../MapContext';
import OpenLayersTileLayer from './OpenLayersTileLayer';

describe('OpenLayersTileLayer', () => {
  let map: Map | undefined;
  let tileLayers: BaseLayer[] | undefined;

  function ui():ReactElement<any> {
    return (
      <OpenLayersMap center={[0, 0]}>
        <MapContext.Consumer>
          {(m) => {
            map = m;
            return null;
          }}
        </MapContext.Consumer>
        <OpenLayersTileLayer name="test-layer" zIndex={22} />

      </OpenLayersMap>
    );
  }

  beforeEach(() => {
    render(ui());
    render(ui());
    render(ui());
    tileLayers = map?.getLayers().getArray().filter((l) => l.getProperties().name === 'test-layer');
  });
  
  it('adds a single tile layer', () => {
    expect(tileLayers?.length).toEqual(1);
  });

  it('sets the zIndex', () => {
    expect(tileLayers?.[0].getZIndex()).toEqual(22);
  });
});
