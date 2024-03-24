import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface Error {
  type: 'network' | 'server';
}

export interface ErrorState {
  error?: Error;
}

const initialState: ErrorState = {
  error: undefined,
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    clear: state => {
      state.error = undefined;
    },
    setError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
  },
});

export const {clear, setError} = errorSlice.actions;

export default errorSlice.reducer;
