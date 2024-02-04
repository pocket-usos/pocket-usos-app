import React, {ReactNode} from 'react';
import {View} from 'react-native';
import Loader from '../Loader/Loader';

export type Props = {
  isLoading: boolean;
  children: ReactNode;
};

const LoadableScreenView: React.FC<Props> = props => {
  return (
    <View>
      <Loader isLoading={props.isLoading} />
      {props.children}
    </View>
  );
};

export default LoadableScreenView;
