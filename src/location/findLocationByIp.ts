/* eslint-disable no-console */
/* eslint-disable camelcase */
import axios from 'axios';
import { IP_GEOLOCATION_API_KEY } from '../config/env';
import { error } from '../utils/error';

interface Response {
  city?: string;
  town?: string;
  state?: string;
  village?: string;
  latitude: number;
  longitude: number;
  state_prov?: string;
  city_district?: string;
}

export async function findLocationByIp(ip: string) {
  let res;
  try {
    res = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${IP_GEOLOCATION_API_KEY}&ip=${ip}&fields=state_prov,city,latitude,longitude`,
    );
  } catch (err) {
    console.error(err);
    try {
      // you can use default address instead
      // but if theres some error on API it can look like just a not found
      res = await axios.get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${IP_GEOLOCATION_API_KEY}&ip=${'181.192.105.255'}&fields=state_prov,city,latitude,longitude`,
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
