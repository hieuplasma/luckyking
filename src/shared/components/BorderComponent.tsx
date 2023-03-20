import { Color, Style } from "@styles";
import React from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";

export interface BorderComponentProps extends ViewProps {
    borderStyle?: StyleProp<ViewStyle>;
    width?: number;
    height?: number;
  }
  
  export const BorderComponent = React.memo((props?: BorderComponentProps) => {
    return (
      <View
        style={[
          Style.Background.Transparent,
          Style.ContentFlexRow.Left,
          Style.Content.CenterInHorizontal,
          {
            transform: [{rotate: '90deg'}],
            width: props?.width ?? 20,
            height: props?.height ?? 20
          },
          props?.style,
        ]}>
        <View
          style={[
            Style.Background.Red,
            Style.Self.Start,
            {
              height: (props?.height ?? 0) / 2 ?? 10,
              width: (props?.width ?? 0) / 2 ?? 10,
              borderBottomRightRadius: 50,
              borderWidth: 1,
              borderColor: Color.grayOpacity,
            },
            props?.borderStyle,
          ]}
        />
      </View>
    );
  });
  