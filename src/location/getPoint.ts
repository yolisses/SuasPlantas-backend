import { Point } from 'geojson';

interface GetPointParams {
  latitude: number;
  longitude: number;
}

export function getPoint({ latitude, longitude }: GetPointParams): Point {
  return {
    type: 'Point',
    coordinates: [latitude, longitude],
  };
}
