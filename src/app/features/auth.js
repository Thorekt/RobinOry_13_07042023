import { createSlice } from '@reduxjs/toolkit';
import { selectAuth } from '../selectors';
import { AUTH_URL } from '../config';

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: {
    status: 'void',
    token: null,
    isLoggedIn: false,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.status = 'void';
      state.error = null;
      return;
    },
    fetching: {
      prepare: () => ({
        payload: {},
      }),
      reducer: (state) => {
        state.isLoggedIn = false;
        state.error = null;
        state.status = 'pending';
        return;
      },
    },
    resolved: {
      prepare: (token) => ({
        payload: { token },
      }),
      reducer: (state, action) => {
        state.status = 'resolved';
        state.token = action.payload.token;
        state.isLoggedIn = true;
        return;
      },
    },
    rejected: {
      prepare: (error) => ({
        payload: { error },
      }),
      reducer: (state, action) => {
        state.isLoggedIn = false;
        state.token = null;
        state.status = 'rejected';
        state.error = action.payload.error;
        return;
      },
    },
  },
});

const { reset, fetching, resolved, rejected } = actions;

export function logout() {
  return (dispatch) => {
    dispatch(reset());
    sessionStorage.setItem('token', '');
  };
}

export function login(email, password) {
  return async (dispatch, getState) => {
    const { status } = selectAuth(getState());
    if (status === 'pending') {
      return;
    }
    dispatch(fetching());
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.status !== 200) {
        throw new Error(data.message);
      }
      const token = data.body.token;
      dispatch(resolved(token));
      sessionStorage.setItem('token', token);
    } catch (error) {
      dispatch(rejected(JSON.stringify(error)));
    }
  };
}

export function loginWithToken(token) {
  return (dispatch) => {
    if(token !== undefined && token !== null && token !== '') {
      dispatch(resolved(token));
    }
  };
}

export default reducer;
