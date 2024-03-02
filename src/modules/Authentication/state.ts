import {createSlice} from '@reduxjs/toolkit';

export interface AuthenticationState {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
}

const initialState: AuthenticationState = {
  isAuthenticated: false,
  isAuthenticating: true,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    startAuthentication: state => {
      state.isAuthenticating = true;
    },
    stopAuthentication: state => {
      state.isAuthenticating = false;
    },
    authenticate: state => {
      state.isAuthenticated = true;
      state.isAuthenticating = false;
    },
    signOut: state => {
      state.isAuthenticated = false;
    },
  },
});

export const {startAuthentication, stopAuthentication, authenticate, signOut} =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
