/* eslint-disable no-console */
/* eslint-disable camelcase */
import axios from 'axios';
import { IP_GEOLOCATION_API_KEY } from '../env/env';
import { error } from '../utils/error';

interface Response {
  city?: string;
  town?: string;
  village?: string;
  city_district?: string;
  state?: string;
  state_prov?: string;
  latitude: number;
  longitude: number;
}

export async function getLocationByIp(ip: string) {
  let res;
  const apiKey = IP_GEOLOCATION_API_KEY;
  try {
    res = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}&fields=state_prov,city,latitude,longitude`,
    );
  } catch (err) {
    console.error(err);
    try {
      res = await axios.get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${'181.192.105.255'}&fields=state_prov,city,latitude,longitude`,
      );
    } catch (finalErr) {
      console.error(finalErr);
      error(500, `ip location failed: ${finalErr.message}`);
    }
  }
  const {
    city,
    town,
    state,
    village,
    latitude,
    longitude,
    state_prov,
    city_district,
  } = res.data as Response;
  return {
    latitude,
    longitude,
    city: city || town || village || city_district,
    state: state || state_prov,
  };
}
