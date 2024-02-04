import {configureStore} from '@reduxjs/toolkit';
import authenticationReducer from '@modules/Authentication/state';
import notificationReducer from '@modules/Notification/state';
import authenticationApi from '@modules/Authentication/api';

export const store = configureStore({
  reducer: {
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    authentication: authenticationReducer,
    notification: notificationReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat([
      authenticationApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
