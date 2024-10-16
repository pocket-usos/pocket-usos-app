import {configureStore} from '@reduxjs/toolkit';
import authenticationReducer from '@modules/Authentication/state';
import notificationReducer from '@modules/Notification/state';
import errorReducer from '@modules/Errors/state';
import authenticationApi from '@modules/Authentication/api';
import usersApi from '@modules/Users/api.ts';
import scheduleApi from '@modules/Schedule/api.ts';
import gradesApi from '@modules/Grades/api.ts';
import coursesApi from '@modules/Courses/api.ts';
import {ErrorHandlingMiddleware} from '../api/error-handling-middleware.ts';
import notificationsApi from '@modules/Notification/api.ts';

export const store = configureStore({
  reducer: {
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [gradesApi.reducerPath]: gradesApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
    authentication: authenticationReducer,
    notification: notificationReducer,
    error: errorReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat([
      authenticationApi.middleware,
      usersApi.middleware,
      scheduleApi.middleware,
      gradesApi.middleware,
      coursesApi.middleware,
      notificationsApi.middleware,
      ErrorHandlingMiddleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
