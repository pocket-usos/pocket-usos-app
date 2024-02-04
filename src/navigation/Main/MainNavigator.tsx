import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from '../routes';

const MainStack = createNativeStackNavigator();

const MainStackScreen: React.FC = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen {...routes.main.home} />
    </MainStack.Navigator>
  );
};

export default MainStackScreen;
