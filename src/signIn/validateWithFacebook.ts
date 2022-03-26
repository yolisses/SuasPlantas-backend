import axios from 'axios';
import { error } from '../utils/error';
import { ValidationResponse } from './ValidationResponse';

interface facebookResponse
{
  id: string,
  name: string,
  email: string,
  picture: { data: { url: string } }
}

// eslint-disable-next-line consistent-return
export async function validateWithFacebook(accessToken: string):Promise<ValidationResponse> {
  try {
    const endpoint = `https://graph.facebook.com/v13.0/me?fields=id%2Cname%2Cemail%2Cpicture.type(large)%7Burl%7D&access_token=${accessToken}`;
    const res = await axios.get(endpoint);
    const { email, name, picture: { data: { url } } } = res.data as facebookResponse;
    return { email, name, picture: url };
  } catch (err) {
    error(400, err.message);
  }
}
