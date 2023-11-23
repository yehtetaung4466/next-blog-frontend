import { decode } from 'jsonwebtoken';
import { JWT } from '../utils/types';
import Cookies from 'js-cookie';

export const getUserFromJwt = () => {
  const cookie = Cookies.get('access_token');
  if (cookie) {
    const user = decode(cookie) as JWT;
    return user;
  }
};
