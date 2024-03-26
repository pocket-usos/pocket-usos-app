import React, {useEffect, useRef} from 'react';
import {Pressable, Text, Animated, View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/Ionicons';

import {getStyles} from './styles';
import {NotificationType} from './state';
import {useAppTheme} from '@styles/theme';

type Props = {
  type: NotificationType;
  message: string;
  onClose: () => void;
};

const Notification: React.FC<Props> = props => {
  const styles = getStyles(props.type);
  const theme = useAppTheme();
  const moveAnimation = useRef(new Animated.Value(-200)).current;
  let closeTimeout: any = null;

  const setCloseTimeout = () => {
    closeTimeout = setTimeout(onClose, 10000);
  };

  const onClose = () => {
    clearTimeout(closeTimeout);
    Animated.timing(moveAnimation, {
      toValue: -200,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setTimeout(props.onClose, 500);
  };

  useEffect(() => {
    Animated.timing(moveAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setCloseTimeout();
  });

  return (
    <Animated.View style={[styles.animatedContainer, {top: moveAnimation}]}>
      <GestureRecognizer
        onSwipeUp={onClose}
        config={{directionalOffsetThreshold: 20}}>
        <View style={styles.container}>
          <Text style={styles.text}>{props.message}</Text>
          <Pressable style={styles.closeContainer} onPress={onClose}>
            <Icon
              name="close-outline"
              size={16}
              color={theme.colors.neutral.white}
            />
          </Pressable>
        </View>
      </GestureRecognizer>
    </Animated.View>
  );
};

export default Notification;
