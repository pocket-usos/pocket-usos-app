import React, {ReactNode} from 'react';
import {View} from 'react-native';
import styles from './styles';

export type Props = {
  children: ReactNode;
};

const ScreenContainer: React.FC<Props> = ({children}) => (
  <View style={styles.container}>{children}</View>
);

export default ScreenContainer;
