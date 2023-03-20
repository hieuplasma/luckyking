import {BaseApi} from './base-api';

export class AuthApi extends BaseApi {
  login(params?: {
    phoneNumber?: string;
    password?: string;
    deviceId?: string;
  }) {
    return this.postMultipart(
      'auth/login',
      {
        phoneNumber: params?.phoneNumber,
        password: params?.password,
        deviceId: params?.deviceId,
      },
      {},
    );
  }

  register(params?: {
    phoneNumber?: string;
    password?: string;
    deviceId?: string;
  }) {
    return this.postMultipart(
      'auth/register',
      {
        phoneNumber: params?.phoneNumber,
        password: params?.password,
        deviceId: params?.deviceId,
      },
      {},
    );
  }
}

export default new AuthApi();
