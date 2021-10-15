export interface ILocation {
  latitude: number;
  longitude: number;
}

export function Location({ latitude, longitude }: ILocation): ILocation {
  return { latitude, longitude };
}
