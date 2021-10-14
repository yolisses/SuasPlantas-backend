import axios from 'axios';
import { error } from 'utils/error';


interface Response {
  city?: string
  town?: string
  village?: string
  city_district?: string
  state?: string
  state_prov?: string
  latitude: number
  longitude: number
}

export async function getLocationByIp(ip: string) {
  const devIp = ip && ip !== '127.0.0.1' ? ip : '181.192.105.255'
  try {

    const apiKey = process.env.IP_GEOLOCATION_API_KEY;
    const res = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${devIp}&fields=state_prov,city,latitude,longitude`);
    console.error(res.data)
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
      city:
        city
        || town
        || village
        || city_district,
      state:
        state
        || state_prov
    }
  } catch (err) {
    console.error(err)
    error(500, 'ip location failed: ' + err.message)
  }
  return null;
}
