import React, {FC} from 'react';
import {StyleSheet, Text as NativeText} from 'react-native';

export const Text: FC<
  {
    children: React.ReactNode;
  } & React.ComponentProps<typeof NativeText>
> = ({children, ...rest}) => {
  return (
    <NativeText style={styles.text} {...rest}>
      {children}
    </NativeText>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#FFFFFF',
  },
});
