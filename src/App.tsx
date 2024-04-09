import React from 'react';
import {PaperProvider} from 'react-native-paper';
import theme from '@styles/theme.ts';
import RootNavigation from '@navigation/RootNavigation.tsx';
import {Provider} from 'react-redux';
import {store} from '@store/store';
import NotificationController from '@modules/Notification/NotificationController.tsx';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {OneSignal} from 'react-native-onesignal';
import Config from 'react-native-config';

const App = () => {
  OneSignal.initialize(Config.ONESIGNAL_APP_ID);
  OneSignal.Notifications.requestPermission(true);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NotificationController />
          <RootNavigation />
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
