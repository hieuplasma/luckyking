import {StackNavigationProp} from '@react-navigation/stack';
import {Icon} from '@assets';
import {Color, Font, Style} from '@styles';
import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProperties,
  StyleSheet,
} from 'react-native';

export interface HeaderTitleConfiguration {
  tintColor?: string;
  style?: object;
}

export interface HeaderOthersConfiguration {
  disableBackTitle?: true;
  backgroundColor?: string;
  enableBottomLine?: boolean;
}

export interface HeaderConfiguration {
  title?: string;
  titleConfigOptions?: HeaderTitleConfiguration;
  otherConfigOptions?: HeaderOthersConfiguration;
  leftIconConfigOptions?: HeaderLeftIconConfiguration;
  loadingIndicatorConfigOption?: ActivityIndicatorProperties;
}

export interface HeaderLoadingIndicatorConfigucation {
  size: ActivityIndicatorProperties;
}

export interface HeaderLeftIconConfiguration {
  iconName?: string;
  iconColor?: string;
  iconSize?: Icon.IconSize;
  view?: JSX.Element;
  onPressed?: Function;
  text?: string;
  disabled?: boolean;
}

export class DefaultHeaderConfiguration implements HeaderConfiguration {
  titleConfigOptions = {
    tintColor: Color.black,
    style: Font.Config.Header.TitleBold,
  };
  otherConfigOptions = {
    backgroundColor: Color.white,
  };
}

export const renderHeaderStyle = (config?: HeaderOthersConfiguration) => ({
  headerStyle: {
    backgroundColor: config?.backgroundColor || Color.white,
    borderBottomWidth: config?.enableBottomLine ? StyleSheet.hairlineWidth : 0,
    borderBottomColor: config?.enableBottomLine ? Color.seperate : undefined,
    shadowOffset: {
      width: 0,
      height: config?.enableBottomLine ? StyleSheet.hairlineWidth : 0,
    },
    elevation: config?.enableBottomLine ? 3 : 0,
  },
});

export const renderTitleStyle = (config?: HeaderTitleConfiguration) => ({
  headerTintColor: config?.tintColor || Color.black,
  headerTitleStyle: config?.style || Font.Config.Header.TitleBold,
});

export const renderLeftIcon = (
  navigation: StackNavigationProp<any, any>,
  config?: HeaderLeftIconConfiguration,
) => ({
  headerLeft: () =>
    renderIcon(navigation, {
      iconName: 'ic_back',
      ...config,
    }),
});

export const renderRightIcon = (
  navigation: StackNavigationProp<any, any>,
  config?: HeaderLeftIconConfiguration,
) => ({
  headerRight: () =>
    renderIcon(navigation, {
      iconName: 'ic_close',
      ...config,
    }),
});

export const renderRightIconWithText = (
  navigation: StackNavigationProp<any, any>,
  config?: HeaderLeftIconConfiguration,
) => ({
  headerRight: () =>
    renderIconWithText(navigation, {
      iconName: 'ic_close',
      ...config,
    }),
});

const renderIcon = (
  navigation: StackNavigationProp<any, any>,
  config?: HeaderLeftIconConfiguration,
) => {
  return config?.view ? (
    config.view
  ) : (
    <Icon.Button
      name={config?.iconName || 'ic_close'}
      color={config?.iconColor || Color.textPrimary}
      size={config?.iconSize}
      onPressed={() => {
        if (config?.onPressed) {
          config.onPressed?.();
        } else {
          if (navigation) {
            navigation.goBack();
          }
        }
      }}
      disabled={config?.disabled}
    />
  );
};

const renderIconWithText = (
  navigation: StackNavigationProp<any, any>,
  config?: HeaderLeftIconConfiguration,
) => {
  return config?.view ? (
    config.view
  ) : (
    <Icon.TextButton
      name={config?.iconName || 'ic_close'}
      color={config?.iconColor || Color.textPrimary}
      size={config?.iconSize}
      text={config?.text}
      textStyle={[Style.Label.Regular.PrimaryContentL_14]}
      onPressed={() => {
        if (config?.onPressed) {
          config.onPressed?.();
        } else {
          if (navigation) {
            navigation.goBack();
          }
        }
      }}
    />
  );
};

export const renderHeaderConfig = (
  navigation: StackNavigationProp<any, any>,
  config?: HeaderConfiguration,
) => {
  return {
    title: config?.title || '',
    ...renderTitleStyle(config?.titleConfigOptions),
    ...renderHeaderStyle(config?.otherConfigOptions),
    ...renderLeftIcon(navigation, config?.leftIconConfigOptions),
  };
};

export const renderTitle = (title?: string) => {
  return {
    title: title,
  };
};

export const renderHeaderManual = (
  title?: string,
  tintColor?: string,
  backgroundColor?: string,
  navigation?: StackNavigationProp<any, any>,
) => {
  let lefIconConfig;
  if (navigation) {
    lefIconConfig = renderLeftIcon(navigation, {
      iconColor: tintColor,
    });
  }
  return {
    title: title,
    ...renderTitleStyle({
      tintColor: tintColor,
    }),
    ...renderHeaderStyle({
      backgroundColor: backgroundColor,
    }),
    ...lefIconConfig,
  };
};

/**
 * render a default header config are
 * + background is white
 * + title and left icon color is black
 * + disable bottonline
 * @param navigation
 * @param theme
 * @param navigationOptions
 * @param screenProps
 */
export const renderDefaultHeader = (
  navigation: StackNavigationProp<any, any>,
  enableBottomLine?: boolean,
) => ({
  ...renderHeaderConfig(navigation, {
    otherConfigOptions: {
      backgroundColor: Color.white,
      enableBottomLine: enableBottomLine,
    },
    leftIconConfigOptions: {
      iconColor: Color.black,
      iconName: 'ic_back',
    },
    titleConfigOptions: {
      tintColor: Color.black,
    },
  }),
});

export const renderModalDefaultHeader = (
  navigation: StackNavigationProp<any, any>,
  enableBottomLine?: boolean,
) => ({
  ...renderHeaderConfig(navigation, {
    otherConfigOptions: {
      backgroundColor: Color.white,
      enableBottomLine: enableBottomLine,
    },
    leftIconConfigOptions: {
      iconColor: Color.textSecondary,
      iconName: 'ic_close',
      iconSize: 'medium',
    },
    titleConfigOptions: {
      tintColor: Color.black,
    },
  }),
});

export const renderLoadingIndicator = (
  isShowLoadingIndicator?: boolean,
  indicatorConfig?: ActivityIndicatorProperties,
) => ({
  headerRight: () => {
    return isShowLoadingIndicator
      ? renderActivityIndicator(indicatorConfig)
      : null;
  },
});

const renderActivityIndicator = (
  indicatorConfig?: ActivityIndicatorProperties,
) => {
  return (
    <ActivityIndicator
      color={indicatorConfig?.color || Color.gray}
      size={indicatorConfig?.size || 'small'}
      style={[Style.Space.MarginHorizontal.Small_8, indicatorConfig?.style]}
    />
  );
};
