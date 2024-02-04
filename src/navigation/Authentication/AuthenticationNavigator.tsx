import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from '../routes';

const AuthStack = createNativeStackNavigator();

const AuthenticationStackScreen: React.FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen {...routes.authentication.chooseUniversity} />
    </AuthStack.Navigator>
  );
};

export default AuthenticationStackScreen;
