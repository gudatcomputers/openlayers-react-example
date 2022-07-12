import { useContext, useEffect, useState } from 'react';
import VectorLayer from 'ol/layer/Vector';
import { Feature } from 'ol';
import { fromLonLat } from 'ol/proj';
import axios from 'axios';
import mapLayerExists from '../helpers/mapLayerExists';
import MapContext from '../MapContext';
import getMapLayer from '../helpers/getMapLayer';
import Employee from '../../Employee';
import geometryFactory from '../geometryFactory';

type PopulationState = 'populating' | 'populated' | undefined;

export default function MapPopulator() {
  const map = useContext(MapContext);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [populationState, setPopulationState] = useState<PopulationState>(undefined);

  useEffect(() => {
    axios.get('http://localhost:3000/example-response.json').then((response) => {
      setEmployees(response.data.employees);
    }).catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e);
    });
  }, []);

  useEffect(() => {
    if (map && mapLayerExists(map, 'people') && employees.length && !populationState) {
      setPopulationState('populating');
      employees.forEach((employee:Employee) => {
        getMapLayer<VectorLayer<any>>(map, 'people')
          .getSource()
          .addFeature(new Feature<any>({
            geometry: geometryFactory.createTriangle(fromLonLat(employee.location)),
            data: employee,
          }));
        setPopulationState('populated');
      });
    }
  }, [map, employees, populationState]);
  return null;
}
