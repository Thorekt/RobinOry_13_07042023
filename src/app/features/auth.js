import { createSlice } from '@reduxjs/toolkit';
import { selectAuth } from '../selectors';

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: {
    status: 'void',
    token: null,
    error: null,
  },
  reducers: {
    fetching: {
      prepare: (email, password) => ({
        payload: { email, password },
      }),
      reducer: (state, action) => {
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
        return;
      },
    },
    rejected: {
      prepare: (error) => ({
        payload: { error },
      }),
      reducer: (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
        return;
      },
    },
  },
});

const { fetching, resolved, rejected } = actions;

export function login(email, password) {
  return async (dispatch, getState) => {
    const { status } = selectAuth(getState());
    if (status === 'pending') {
      return;
    }
    dispatch(fetching(email, password));
    try {
      const response = await fetch(`http://localhost:3001/api/v1/user/login`, {
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
