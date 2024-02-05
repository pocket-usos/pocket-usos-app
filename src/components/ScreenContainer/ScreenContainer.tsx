import React, {ReactNode} from 'react';
import {View} from 'react-native';
import styles from './styles';

export type Props = {
  children: ReactNode;
  isRoot?: boolean;
};

const ScreenContainer: React.FC<Props> = ({children, isRoot}) => (
  <View style={isRoot ? styles.rootContainer : styles.container}>
    {children}
  </View>
);

export default ScreenContainer;
