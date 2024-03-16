import React from 'react';
import routes from '../routes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainMenu from '@components/MainMenu/MainMenu.tsx';

const MainStack = createBottomTabNavigator();

const MainStackScreen: React.FC = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <MainMenu {...props} />}
      initialRouteName={routes.main.home.name}>
      <MainStack.Screen {...routes.main.home} />
      <MainStack.Screen {...routes.main.schedule} />
      <MainStack.Screen {...routes.main.grades} />
      <MainStack.Screen {...routes.main.courses} />
      <MainStack.Screen {...routes.main.singleCourse} />
      <MainStack.Screen {...routes.main.lecturerDetails} />
    </MainStack.Navigator>
  );
};

export type MainStackParamList = {
  Home: undefined;
  Schedule: undefined;
  Grades: undefined;
  Courses: undefined;
};

export type Route = 'Home' | 'Schedule' | 'Grades' | 'Courses';

export default MainStackScreen;
