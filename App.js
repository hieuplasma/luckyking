import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { RootNavigation } from '@navigation';
import reduxConfig from './src/redux/config-store';
import { Connection } from '@api';
import { Color } from '@styles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import { PermissionsAndroid } from 'react-native';

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      store: reduxConfig(async () => {
        console.log('STORE is setup successfully! :::::::', this.state.store);
        Connection.init(this.state.store.store);
        this.setState({
          isLoading: false
        })
      }),
    };
  }

  // componentDidMount() {
  //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  // }

  render() {
    const { isLoading, store } = this.state;
    if (isLoading) {
      return (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              backgroundColor: 'white',
              minHeight: 100,
              minWidth: 100,
              borderRadius: 8,
            }}>
            <ActivityIndicator size="large" color={Color.luckyKing} />
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, }}>
        <StatusBar translucent={true} barStyle={'dark-content'} />
        <Provider store={store.store}>
          <PersistGate
            // loading={<SplashScreen />}
            persistor={store.persistor}>
            <StatusBar barStyle={'light-content'} />
            <RootNavigation />
          </PersistGate>
        </Provider>
      </View>
    );
  }
}


export default App