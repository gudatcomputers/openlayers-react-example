import { Feature, Map } from 'ol';
import React, { ReactElement } from 'react';
import { act, render, RenderResult } from '@testing-library/react';
import VectorLayer from 'ol/layer/Vector';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import OpenLayersMap from '../OpenLayersMap';
import MapContext from '../MapContext';
import OpenLayersVectorLayer from './OpenLayersVectorLayer';
import MapPopulator from './MapPopulator';
import getMapLayer from '../helpers/getMapLayer';

describe('MapPopulator', () => {
  let mockAdapter: MockAdapter;
  let map: Map | undefined;
  let features: Feature<any>[];

  function ui(): ReactElement<any> {
    return (
      <OpenLayersMap center={[0, 0]}>
        <MapContext.Consumer>
          {(m) => {
            map = m;
            return null;
          }}
        </MapContext.Consumer>
        <OpenLayersVectorLayer name="people" zIndex={22} />
        <MapPopulator />
      </OpenLayersMap>
    );
  }

  beforeEach(async () => {
    mockAdapter = new MockAdapter(axios);
    mockAdapter.onGet('http://localhost:3000/example-response.json').reply(200, {
      employees: [
        {
          name: 'first-employee',
          role: 'first-employee-role',
          location: [-74.0090, 40.7230],
        },
        {
          name: 'second-employee',
          role: 'second-employee-role',
          location: [-74.0090, 40.7030],
        }],
    });

    let renderResult: RenderResult;

    await act(async () => {
      renderResult = render(ui());
      // eslint-disable-next-line no-promise-executor-return
      await (() => new Promise((r) => setTimeout(r, 1000)))();
    });

    act(() => {
      renderResult?.rerender(ui());
    });

    features = getMapLayer<VectorLayer<any>>(map!, 'people').getSource().getFeatures();
  });

  it('adds the appropriate number of features to the map', () => {
    expect(features.length).toEqual(2);
  });

  it('sets the data properties of each feature', () => {
    expect(features.map((f) => f.get('data'))).toEqual([{
      name: 'first-employee',
      role: 'first-employee-role',
      location: [-74.0090, 40.7230],
    }, {
      name: 'second-employee',
      role: 'second-employee-role',
      location: [-74.0090, 40.7030],
    }]);
  });
});
