import axios from 'axios';
import { error } from '../utils/error';
import { ValidationResponse } from './ValidationResponse';

// eslint-disable-next-line consistent-return
export async function validateWithFacebook(accessToken: string):Promise<ValidationResponse> {
  try {
    const res = await axios.get(`https://graph.facebook.com/v12.0/me?fields=id%2Cname%2Cemail%2Cpicture.type(large)%7Burl%7D&access_token=${accessToken}`);
    console.log(res.data);
    const { email, name, picture } = res.data;
    return { email, name, picture };
  } catch (err) {
    error(400, err.message);
  }
}
