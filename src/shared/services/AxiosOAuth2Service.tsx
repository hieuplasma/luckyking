import axios, {AxiosError, AxiosRequestConfig, AxiosInstance} from 'axios';
/**
 * This class add one interceptor to detect response data of all api in app.
 * It design for authentication mechnism is OAuth-2. I use axios library to call api
 * if once api has error with code = 401, that mean access token was expired,
 * we should call api refresh token to get new one access token and refresh token
 * in the time, we refresh token, if any request api to come, we will add them to and waitting array.
 * After we refresh token success, we will retry all request in the waitting array with new access token.
 *
 */
class AxiosOAuth2Service {
  /**
   * the flag to mark we are doing refresh token, when it equals true that mean we are in process to refresh token
   */
  isRefreshing: boolean = false;
  /**
   * the array to store all resolved and reject promise of all api has been called while we call refresh token
   */
  waitingPromiseQueue?: [
    {resolve?: (value?: unknown) => void; reject?: (reason?: any) => void},
  ];
  /**
   * the refresh token callback, it will be call to client for get new access token and refresh token
   */
  refreshTokenCallback?: (
    originalRequestConfig: AxiosRequestConfig,
  ) => Promise<any>;

  axiosInstance: AxiosInstance | undefined;

  constructor() {
    this.initial();
    this.waitingPromiseQueue = [{}];
  }
  /**
   * initial interceptor to deact all request and api response
   */
  private initial() {
    this.axiosInstance = axios.create();
    this.axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      (error: AxiosError) => {
        let self = this;
        const originalRequestConfig = error.config;
        if (error.response && error.response?.status === 401) {
          if (self.isRefreshing) {
            return new Promise(function (resolve, reject) {
              self.waitingPromiseQueue?.push({resolve, reject});
            })
              .then(token => {
                originalRequestConfig.headers[
                  'Authorization'
                ] = `Bearer ${token}`;
                return axios(originalRequestConfig);
              })
              .catch(err => {
                return Promise.reject(err);
              });
          }
          self.isRefreshing = true;
          return this.refreshToken(originalRequestConfig);
        } else {
          return Promise.reject(error);
        }
      },
    );
  }

  private refreshToken(
    originalRequestConfig: AxiosRequestConfig,
  ): Promise<any> {
    let self = this;
    return new Promise(function (resolve, reject) {
      (self.refreshTokenCallback
        ? self.refreshTokenCallback(originalRequestConfig)
        : Promise.reject()
      )
        .then(response => {
          self.isRefreshing = false;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * This function will be called in client to set up callback refresk token action when we refresh token success
   * @param _refreshTokenCallback
   */
  setup(params?: {
    refreshTokenCallback?: (
      originalRequestConfig: AxiosRequestConfig,
    ) => Promise<any>;
    timeout?: number;
    timeoutErrorMessage?: string;
  }) {
    if (!params?.refreshTokenCallback) {
      throw new Error('the refresh token must be initial');
    }
    this.refreshTokenCallback = params?.refreshTokenCallback;
    if (this.axiosInstance) {
      this.axiosInstance.defaults.timeout = params?.timeout ?? 60 * 1000;
      this.axiosInstance.defaults.timeoutErrorMessage =
        params?.timeoutErrorMessage;
    }
  }
  processWaittingQueue = (error?: any, newAccessToken?: string) => {
    this.waitingPromiseQueue?.forEach(item => {
      if (error) {
        item.reject ? item.reject(error) : null;
      } else {
        item.resolve ? item.resolve(newAccessToken) : null;
      }
    });
    this.clearWaittingQueue();
  };

  clearWaittingQueue() {
    this.waitingPromiseQueue = [{}];
  }

  /**
   * get axios instance
   */
  getAxiosInstance(): AxiosInstance | undefined {
    return this.axiosInstance;
  }

  /**
   * example refresh token action fuction in client
   * const refreshToken = (originalRequestConfig: AxiosRequestConfig) => {
      return new Promise(function(resolve, reject) {
        AuthUtil.getRefreshToken()
          .then((refreshToken: string) => {
            return authApi
              .refreshToken(refreshToken)
              .then(response => {
                AuthUtil.saveToken(response.refresh_token, response.access_token);
                originalRequestConfig.headers['Authorization'] = `Bearer ${response.access_token}`;
                AxiosOAuth2Service.processWaittingQueue(null, response.access_token);
                resolve(axios(originalRequestConfig));
              })
              .catch((error?: AxiosError) => {
                AxiosOAuth2Service.clearWaittingQueue();
                // send force logout event
                AuthUtil.clearStorage()
                Event.emitEvent(EventName.ForceLogout);
                reject(error);
              });
          })
          .catch(error => {
            AxiosOAuth2Service.processWaittingQueue(error);
            reject(error);
          });
      });
    };
   */
}

export default new AxiosOAuth2Service();
