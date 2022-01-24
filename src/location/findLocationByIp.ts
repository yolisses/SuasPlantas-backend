/* eslint-disable no-console */
/* eslint-disable camelcase */
import axios from 'axios';
import { error } from '../utils/error';

interface Response {
  ip:string
  version:string
  city:string
  region:string
  region_code:string
  country:string
  country_name:string
  country_code:string
  country_code_iso3:string
  country_capital:string
  country_tld:string
  continent_code:string
  in_eu:boolean
  postal:string
  latitude:number
  longitude:number
  timezone:string
  utc_offset:string
  country_calling_code:string
  currency:string
  currency_name:string
  languages:string
  country_area:number
  country_population:number
  asn:string
  org:string
}

export async function findLocationByIp(ip: string) {
  let res;
  try {
    res = await axios.get(`https://ipapi.co/${ip}/json`);
    if (res.data.error) { throw res.data; }
  } catch (err) {
    console.error(err);
    try {
      // you can use default address instead
      // but if theres some error on API it can look like just a not found
      res = await axios.get('https://ipapi.co/181.192.105.255/json');
      if (res.data.error) { throw res.data; }
    } catch (finalErr) {
      console.error(finalErr);
      error(500, `ip location failed: ${finalErr.message}`);
    }
  }

  const {
    latitude, longitude, city, region,
  } = res.data as Response;
  return {
    latitude, longitude, city, state: region,
  };
}
