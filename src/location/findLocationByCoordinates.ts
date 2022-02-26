/* eslint-disable camelcase */
import axios from 'axios';
import { ILocation } from './Location';
import { LOCATIONIQ_API_KEY } from '../config/env';

interface Address {
  city?: string;
  town?: string;
  village?: string;
  city_district?: string;
  state?: string;
}

interface IResponse{
  address:Address
}

interface LocationParams{
  latitude:number|string
  longitude:number|string
}

export async function findLocationByCoordinates({
  latitude,
  longitude,
}:LocationParams) {
  const res = await axios.get(
    `https://us1.locationiq.com/v1/reverse.php?key=${LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&accept-language=pt&format=json`,
  );

  const { address } = res.data as IResponse;

  const {
    city,
    town,
    state,
    village,
    city_district,
  } = address;

  const locationName = {
    city: city || town || village || city_district,
    state,
  };

  return locationName;
}
