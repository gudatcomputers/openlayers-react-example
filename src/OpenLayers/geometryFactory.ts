import { Coordinate } from 'ol/coordinate';
import { Polygon } from 'ol/geom';

function createTriangle(coordinate:Coordinate):Polygon {
  const leftX = coordinate[0] - 15;
  const rightX = coordinate[0] + 15;
  const topY = coordinate[1] + 15;
  const bottomY = coordinate[1] - 15;

  return new Polygon(
    [[
      [leftX, bottomY],
      [coordinate[0], topY],
      [rightX, bottomY],
      [leftX, bottomY], // polygons must end of the starting coordinate
    ]],
  );
}

export default {
  createTriangle,
};
