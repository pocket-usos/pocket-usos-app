import React from 'react';
import AnimatedLoader from 'react-native-animated-loader';
import styles from './styles';

export type Props = {
  isLoading: boolean;
};

const Loader: React.FC<Props> = props => (
  <AnimatedLoader
    visible={props.isLoading}
    overlayColor="rgba(255,255,255,1)"
    source={require('../../../assets/json/loader.json')}
    animationStyle={styles.animation}
    speed={1}
  />
);

export default Loader;
