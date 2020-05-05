import { User } from '.';

interface LoginInfo {
  token: string;
  authExpirationTime: number;
  userName: string;
}

export default LoginInfo;
