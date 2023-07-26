import authApi from './apis/auth-api';
import userApi from './apis/user-api';
import lotteryApi from './apis/lottery-api';

import { RESPONSE_TIMEOUT, TIMEOUT_MESSAGE, TYPE_API, API_HOST } from './config';
import jwtDecode from 'jwt-decode';
import { Alert } from 'react-native';
import { removeToken, removeUser } from '@redux';
// import NetInfo from '@react-native-community/netinfo';

const axios = require('axios').default;

export { authApi, userApi, lotteryApi, API_HOST };

export class Connection {
    static init(store) {
        let con = new Connection(store);
        window.connection = con;
    }

    constructor(store) {
        this._store = store;
    }

    state = {
        alertPresent: false,
    };

    _showErrorAlert(message) {
        if (!this.state.alertPresent) {
            this.state.alertPresent = true;
            Alert.alert('Lỗi', message, [
                {
                    text: 'OK',
                    onPress: () => {
                        this.state.alertPresent = false;
                    },
                },
            ]);
        }
    }

    _dispatch(action) {
        this._store.dispatch(action);
    }

    /**********************************************************************************************************************************
     *
     * Implement code for API
     *
     **********************************************************************************************************************************/

    POST = async (uri, body, isFormData, timeout) => {
        console.log('API POST ::::::::::::', `${API_HOST}${uri}`);
        return await this.requestApi(
            TYPE_API.POST,
            uri,
            body,
            isFormData,
            timeout,
            undefined,
        );
    };

    GET = async (uri, params, timeout) => {
        console.log('API GET ::::::::::::', `${API_HOST}${uri}`);
        return await this.requestApi(
            TYPE_API.GET,
            uri,
            params,
            null,
            timeout,
            null,
        );
    };

    requestApi = async (
        typeApi,
        uri,
        body,
        isFormData,
        timeout,
        tokenParam,
    ) => {
        let token = this._store.getState().authReducer.accessToken;

        if (tokenParam) {
            token = tokenParam;
        }
        else {
            // HANDLE TOKEN EXPIRE
            let tokenDecode = token === '' ? null : jwtDecode(token);
            let timeExpired = tokenDecode ? tokenDecode.exp : null;
            let currentTime = Math.floor(new Date().getTime() / 1000);

            if (timeExpired && timeExpired < currentTime) {
                
            }
        }

        let headers = {
            'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
            'X-Authorization': `Bearer ${token}`,
            Authorization: `Bearer ${token}`,
        };

        if (token === '') {
            delete headers['X-Authorization'];
            delete headers['Authorization'];
        }

        let fullUrl = uri;
        if (typeApi === TYPE_API.GET && body) {
            fullUrl += '?';
            let i = 0;
            for (let key in body) {
                if (body[key] !== undefined && body[key] !== null) {
                    // console.log("body[key]  ::::", body[key])
                    if (i != 0) {
                        fullUrl += `&${key}=${body[key]}`;
                    } else {
                        fullUrl += `${key}=${body[key]}`;
                    }
                    i++;
                }
            }
        }

        const source = axios.CancelToken.source();

        console.log('url:::::', `${API_HOST}${uri}`);
        console.log('body:::::', JSON.stringify(body));

        return (
            typeApi === TYPE_API.POST
                ? axios.post(
                    `${API_HOST}${uri}`,
                    isFormData && body ? body : body ? JSON.stringify(body) : null,
                    {
                        headers: headers,
                        timeout: timeout ? timeout : RESPONSE_TIMEOUT,
                        timeoutErrorMessage: TIMEOUT_MESSAGE,
                        cancelToken: source.token,
                        ts: Date.now(),
                    },
                )
                : axios.get(`${API_HOST}${fullUrl}`, {
                    headers: headers,
                    timeout: timeout ? timeout : RESPONSE_TIMEOUT,
                    timeoutErrorMessage: TIMEOUT_MESSAGE,
                    cancelToken: source.token,
                    ts: Date.now(),
                })
        )
            .then(res => {
                console.log('RES IN API OF ' + uri + ' :::::::::::>', res);
                if (!res.data) return undefined;
                if (res.data.errorCode) {
                    this._showErrorAlert(res.data.errorMessage);
                    return 0;
                }
                return {
                    ...res,
                    success: true,
                };
            })
            .catch(error => {
                console.log('ERROR IN API OF ' + uri + ' :::::::::::>', error);
                if (error.response) {
                    if (error.response?.data?.statusCode == 401) {
                        if (token)
                            this._showErrorAlert(
                                'Phiên đăng nhập hiện không còn khả dụng!',
                            );
                        else this._showErrorAlert(error.response?.data?.message);
                        // this._showErrorAlert(error.response?.data?.message);
                        this._dispatch(removeUser());
                        this._dispatch(removeToken());
                        // NavigationUtils.resetGlobalStackWithScreen(undefined, ScreenName.Authentication)
                        return undefined;
                    }

                    if (error.response?.data?.message) {
                        if (Array.isArray(error.response?.data?.message))
                            this._showErrorAlert(error.response.data.message[0]);
                        else this._showErrorAlert(error.response.data.message);
                    }
                } else if (error.request) {
                    // this._showErrorAlert(error.request._response);
                    this._showErrorAlert("Không kết nối được với server, vui lòng kiểm tra Internet và thử lại");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    this._showErrorAlert('Lỗi không xác định');
                }
            });
    };
}
