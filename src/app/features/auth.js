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
    reset: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.status = 'void';
      state.error = null;
      return;
    },
    fetching: {
      prepare: (email, password) => ({
        payload: { email, password },
      }),
      reducer: (state, action) => {
        state.isLoggedIn = false;
        state.error = null;
        state.status = 'pending';
        return;
      },
    },
    resolved: {
      prepare: (data) => ({
        payload: { data },
      }),
      reducer: (state, action) => {
        state.status = 'resolved';
        state.token = action.payload.data.body.token;
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
        state.status = 'rejected';
        state.error = action.payload;
        return;
      },
    },
  },
});

const { reset, fetching, resolved, rejected } = actions;

export function logout() {
  return (dispatch) => {
    dispatch(reset());
  };
}

export function login(email, password) {
  return async (dispatch, getState) => {
    const { status } = selectAuth(getState());
    if (status === 'pending') {
      return;
    }
    dispatch(fetching(email, password));
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
      dispatch(resolved(data));
    } catch (error) {
      dispatch(rejected(JSON.stringify(error)));
    }
  };
}

export default reducer;
