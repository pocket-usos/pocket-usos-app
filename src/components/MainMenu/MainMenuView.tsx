import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import MainMenuItem from '@components/MainMenu/MainMenuItem.tsx';
import styles from './styles.ts';
import {Route} from './MainMenu.tsx';

interface Props {
  navigation: any;
  activeRouteIndex: number;
  routes: Route[];
}

const MainMenuView: React.FC<Props> = ({
  navigation,
  activeRouteIndex,
  routes,
}) => {
  const {t} = useTranslation();

  const icons: any = {
    Home: require('../../../assets/images/home-icon.png'),
    Schedule: require('../../../assets/images/schedule-icon.png'),
    Grades: require('../../../assets/images/grades-icon.png'),
    Courses: require('../../../assets/images/courses-icon.png'),
  };

  return (
    <View style={styles.mainMenu}>
      {routes.map((route: Route, index) => {
        const isActive = activeRouteIndex === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <MainMenuItem
            key={route.key}
            isActive={isActive}
            text={t(route.name)}
            iconSource={icons[route.name]}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
};

export default MainMenuView;
