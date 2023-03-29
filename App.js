import { RootNavigationUtils } from '@shared';
import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigation } from '@navigation';
import reduxConfig from './src/redux/config-store';
import { Connection } from '@api';
import { Color } from '@styles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SplashScreen } from '@screen';

// export interface MainApplicationProps { }

// const MainApplication = (props?: MainApplicationProps) => {
//   return (
//     <>
//       <StatusBar barStyle={'light-content'} />
//       <NavigationContainer ref={RootNavigationUtils.navigationRef}>
//         <RootNavigation />
//       </NavigationContainer>
//     </>
//   );
// };

// export default MainApplication;

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

  componentDidMount() { }

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
            <ActivityIndicator size="large" color={Color.red} />
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
            <NavigationContainer ref={RootNavigationUtils.navigationRef}>
              <RootNavigation />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </View>
    );
  }
}


export default App