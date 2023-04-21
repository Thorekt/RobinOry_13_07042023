import { createSlice } from '@reduxjs/toolkit';
import { selectProfile } from '../selectors';
const { actions, reducer } = createSlice({
  name: 'profile',
  initialState: {
    status: 'void',

    profileData: null,

    error: null,
  },
  reducers: {
    reset: (state, action) => {
      state.profileData = null;
      state.status = 'void';
      state.error = null;
      return;
    },
    fetching: {
      prepare: (tokenAuth) => ({
        payload: { tokenAuth },
      }),
      reducer: (state, action) => {
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
        state.profileData = action.payload.data;
        state.status = 'resolved';
        return;
      },
    },
    rejected: {
      prepare: (error) => ({
        payload: { error },
      }),
      reducer: (state, action) => {
        state.error = action.payload;
        state.status = 'rejected';
        return;
      },
    },
  },
});

const { reset, fetching, resolved, rejected } = actions;

export function fetchOrUpdateProfile(tokenAuth) {
  return async (dispatch, getState) => {
    const { status } = selectProfile(getState());
    if (status === 'pending') {
      return;
    }
    dispatch(fetching(tokenAuth));
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/user/profile`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenAuth,
          },
        }
      );
      const data = await response.json();
      dispatch(resolved(data.body));
    } catch (error) {
      dispatch(rejected(error));
    }
  };
}

export function resetProfile() {
  return (dispatch) => dispatch(reset());
}

export default reducer;
