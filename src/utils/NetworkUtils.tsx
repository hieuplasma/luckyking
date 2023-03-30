import NetInfo, {NetInfoStateType} from '@react-native-community/netinfo';
export type NetworkErrorType = 'NO_INTERNET' | 'ERROR_CONNECTTION' | undefined;

export const NetworkUtils = {
  getNetworkError(): Promise<NetworkErrorType> {
    return NetInfo.fetch()
      .then(state => {
        if (state.isConnected) {
          return Promise.resolve<NetworkErrorType>(undefined);
        } else if (state.type === NetInfoStateType.none) {
          // no internet connection
          return Promise.resolve<NetworkErrorType>('NO_INTERNET');
        } else {
          return Promise.resolve<NetworkErrorType>('ERROR_CONNECTTION');
        }
      })
      .catch(() => {
        return Promise.resolve<NetworkErrorType>('ERROR_CONNECTTION');
      });
  },
};
