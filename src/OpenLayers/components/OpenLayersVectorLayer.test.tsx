import React, { ReactElement } from 'react';
import { Map } from 'ol';
import { render } from '@testing-library/react';
import VectorLayer from 'ol/layer/Vector';
import BaseLayer from 'ol/layer/Base';
import { Style } from 'ol/style';
import OpenLayersMap from '../OpenLayersMap';
import OpenLayersVectorLayer from './OpenLayersVectorLayer';
import MapContext from '../MapContext';

describe('OpenLayersVectorLayer', () => {
  let map: Map | undefined;
  let vectorLayers: BaseLayer[] | undefined;
  let vectorLayer:VectorLayer<any>;

  function ui():ReactElement<any> {
    return (
      <OpenLayersMap center={[0, 0]}>
        <MapContext.Consumer>
          {(m) => {
            map = m;
            return null;
          }}
        </MapContext.Consumer>
        <OpenLayersVectorLayer name="test-layer" zIndex={22} />

      </OpenLayersMap>
    );
  }

  beforeEach(() => {
    render(ui());
    render(ui());
    render(ui());
    vectorLayers = map?.getLayers().getArray().filter((l) => l.getProperties().name === 'test-layer');
    vectorLayer = vectorLayers?.[0] as VectorLayer<any>;
  });

  it('adds a single vector layer', () => {
    expect(vectorLayers?.length).toEqual(1);
  });

  it('adds the requested vector layer', () => {
    expect(vectorLayer).toBeInstanceOf(VectorLayer);
  });

  it('sets the zIndex', () => {
    expect(vectorLayer.getZIndex()).toEqual(22);
  });

  it('sets the style', () => {
    const layerStyle = vectorLayer.getStyle() as Style;
    expect(layerStyle.getFill().getColor()).toEqual('black');
    expect(layerStyle.getStroke().getColor()).toEqual('red');
    expect(layerStyle.getStroke().getWidth()).toEqual(3);
  });
});
