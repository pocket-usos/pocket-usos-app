import {isRejectedWithValue} from '@reduxjs/toolkit';
import {store} from '@store/store';
import {showNotification} from '@modules/Notification/state.ts';
import type {MiddlewareAPI, Middleware} from '@reduxjs/toolkit';
import {t} from 'i18next';
import {signOut} from '@modules/Authentication/state.ts';

export const ErrorHandlingMiddleware: Middleware =
  (api: MiddlewareAPI) => next => action => {
    if (isRejectedWithValue(action)) {
      const message =
        'data' in action.error
          ? (action.error.data as {userMessage: string}).userMessage
          : undefined;

      const statusCode = action.payload.data.status;

      if (statusCode == 401) {
        store.dispatch(signOut());

        store.dispatch(
          showNotification({
            type: 'error',
            message: message ?? t('You have been signed out from USOS'),
          }),
        );
      } else {
        store.dispatch(
          showNotification({
            type: 'error',
            message:
              message ?? t('Something went wrong, Please try again later'),
          }),
        );
      }
    }

    return next(action);
  };
