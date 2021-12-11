import axios from 'axios';
import { LOCATIONIQ_API_KEY } from 'env/env';
import { ILocation } from './Location';

interface Address {
  city?: string;
  town?: string;
  village?: string;
  city_district?: string;
  state?: string;
}

export async function getLocationByCoordinates({
  latitude,
  longitude,
}: ILocation) {
  const apiKey = LOCATIONIQ_API_KEY;
  const res = await axios.get(
    `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&accept-language=pt&format=json`,
  );

  const { address } = res.data as { address: Address };
  const {
    city, town, village, city_district, state,
  } = address;
  const locationName = {
    city: city || town || village || city_district,
    state,
  };
  return locationName;
}
