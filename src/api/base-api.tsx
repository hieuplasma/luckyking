import {API_HOST} from '@configs';
import {ScreenName} from '@navigation';
import {
  AxiosOAuth2Service,
  currentLanguge,
  NetworkUtils,
  RootNavigationUtils,
  translate,
} from '@shared';

export class BaseApi {
  apiHostUrl = `${API_HOST}`;
  baseUri?: string;

  constructor(baseUri?: string) {
    this.baseUri = baseUri;
  }

  async get(uri: string, params: any, noAddPrefix = false, showNetworkError = false) {
    const url = this.createUrl(uri, noAddPrefix);
    return AxiosOAuth2Service.getAxiosInstance()
      ?.get(url, {
        params,
      })
      .then(response => this.onSuccess(response))
      .catch(error => {
        return this.onFailed(error);
      });
  }

  async post(uri: string, data: any, params: any, noAddPrefix = false, showNetworkError = true) {
    const url = this.createUrl(uri, noAddPrefix);
    return AxiosOAuth2Service.getAxiosInstance()
      ?.post(url, data, {
        params,
      })
      .then(response => response && response.data)
      .catch(error => {
        return this.onFailed(error);
      });
  }

  async postMultipart(uri: string, data: any, params: any, noAddPrefix = false, showNetworkError = true) {
    const url = this.createUrl(uri, noAddPrefix);    
    return AxiosOAuth2Service.getAxiosInstance()
      ?.post(url, data, {
        params,
      })
      .then(response => response && response.data)
      .catch(error => {
        return this.onFailed(error);
      });
  }


  async postUrlEncoded(
    uri: string,
    data: any,
    noAddPrefix = false,
    onErrorHandler?: (error?: object) => void,
    showNetworkError = true,
  ) {
    const url = this.createUrl(uri, noAddPrefix);    
    var qs = require('qs');
    return AxiosOAuth2Service.getAxiosInstance()
      ?.post(url, qs.stringify(data), {
        headers: {
          ...{'content-type': 'application/x-www-form-urlencoded'},
        },
      })
      .then((response: any) => response && response.data)
      .catch((error: any) => {
        onErrorHandler?.(error)
        return this.onFailed(error);
      });
  }

  async put(uri: string, data: any, params: any, noAddPrefix = false, showNetworkError = true) {
    const url = this.createUrl(uri, noAddPrefix);
    return AxiosOAuth2Service.getAxiosInstance()
      ?.put(url, data, {
        params,
      })
      .then(response => response && response.data)
      .catch(error => {
        return this.onFailed(error);
      });
  }

  async delete(uri: string, data: any, params: any, noAddPrefix = false, showNetworkError = true) {
    const url = this.createUrl(uri, noAddPrefix);
    return AxiosOAuth2Service.getAxiosInstance()?.({
      method: 'delete',
      url,
      data,
      params,
    })
      .then(response => response && response.data)
      .catch(error => {
        return this.onFailed(error);
      });
  }

  createUrl(uri: string, noPrefix: boolean = false) {
    let url = noPrefix ? uri : `${this.apiHostUrl}/${uri}`;
    return url;
  }

  onSuccess = (response: any) => {
    var ret = null;
    if (response?.status === 200) {
      ret = response.data;
    }
    return ret;
  };

  onFailed = (error: any, showNetworkError = true) => {
    console.log('error',error);
    if (error.response) {
      var errorMessage: any = undefined;
      const response = error && error.response;
      if (response != null && response.status === 401) {
        RootNavigationUtils.navigate(ScreenName.SplashScreen);
        return Promise.reject();
      } else {
        const data = response && response.data;
        const messages = data && data.messages;
        const errorDescription = data && data.error_description;
        if (errorDescription) {
          errorMessage = errorDescription;
        } else {
          if (messages && Array.isArray(messages)) {
            errorMessage = messages.join(',');
          } else {
            errorMessage = translate('error.generic');
          }
        }
        return Promise.reject(errorMessage);
      }
    } else {
      if (!showNetworkError) {
        return Promise.reject();
      } else {
        return NetworkUtils.getNetworkError().then(status => {
          switch (status) {
            case 'ERROR_CONNECTTION':
              return Promise.reject(translate('error.noNetwork'));
            case 'NO_INTERNET':
              return Promise.reject(translate('error.noInternet'));
            default:
              return Promise.reject(translate('error.noNetwork'));
          }
        });
      }
    }
  };
}
