import React from 'react';
import {PaperProvider} from 'react-native-paper';
import theme from '@styles/theme.ts';
import RootNavigation from '@navigation/RootNavigation.tsx';
import {Provider} from 'react-redux';
import {store} from '@store/store';
import NotificationController from '@modules/Notification/NotificationController.tsx';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
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
