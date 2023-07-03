import { Color, Dimension, Style } from '@styles';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { StyleProp, TextInput, TextInputProps, View, ViewStyle, StyleSheet } from 'react-native';
import { IText } from '../texts';

export interface InputComponentProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  value?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onPressIconRight?: () => void;
  isTyping?: boolean;
  renderLeftView?: JSX.Element;
}

export function InputComponent(props: InputComponentProps) {
  const {
    errorMessage,
    value,
    onChangeText,
    label,
    containerStyle,
    keyboardType,
    secureTextEntry,
    onPressIconRight,
    renderLeftView,
    ...rest
  } = props;
  const [isTyping, setIsTyping] = useState(false);

  const onFocus = useCallback(() => {
    setIsTyping(true);
  }, []);

  const onBlur = useCallback(
    (e?: any) => {
      setIsTyping(false);
      rest?.onBlur?.(e);
    },
    [rest?.onBlur],
  );

  return (
    <View style={containerStyle}>
      {label && (
        <IText
          style={[Style.Label.Regular.TextSecondaryContentL_14, Style.Space.MarginBottom.small_8, {marginLeft: 4}]}>
          {label}
        </IText>
      )}
      <View
        style={[
          styles.container,
          props.errorMessage ? styles.error : undefined,
          isTyping && !props.errorMessage ? styles.typing : undefined,
        ]}>
        {renderLeftView}
        <TextInput
          allowFontScaling={false}
          {...rest}
          onChangeText={(value?: string) => onChangeText && onChangeText(value ?? '')}
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={Color.textHint}
          style={[Style.Label.Regular.PrimaryContentXL_16, Style.Size.MatchParent, props?.style, { fontFamily: 'myriadpro-regular' }]}
          multiline={false}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </View>
      {errorMessage ? (
        <IText style={[Style.Label.Regular.RedContent_13, 
          {marginLeft: 4, marginTop: 6, fontSize: 14}]}>{errorMessage}</IText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 46,
    borderRadius: 10,
    paddingHorizontal: Dimension.mediumMargin,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: Color.seperate,
    borderWidth: 2,
  },
  error: {
    borderColor: Color.red,
  },
  typing: {
    borderColor: Color.primary,
  },
});
