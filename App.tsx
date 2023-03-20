import {RootNavigationUtils} from '@shared';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigation} from '@navigation';

export interface MainApplicationProps {}

const MainApplication = (props?: MainApplicationProps) => {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer ref={RootNavigationUtils.navigationRef}>
        <RootNavigation />
      </NavigationContainer>
    </>
  );
};

export default MainApplication;
