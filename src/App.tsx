import React from 'react';
import {PaperProvider} from 'react-native-paper';
import theme from '@styles/theme.ts';
import RootNavigation from '@navigation/RootNavigation.tsx';
import {Provider} from 'react-redux';
import {store} from '@store/store';
import NotificationController from '@modules/Notification/NotificationController.tsx';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NotificationController />
        <RootNavigation />
      </PaperProvider>
    </Provider>
  );
};

export default App;
