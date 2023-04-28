import { createSlice } from '@reduxjs/toolkit';
import { selectProfile, selectAuth  } from '../selectors';
import { PROFILE_URL } from '../config';



const { actions, reducer } = createSlice({
  name: 'profile',
  initialState: {
    status: 'void',

    profileData: null,

    error: null,
  },
  reducers: {
    reset: (state) => {
      state.profileData = null;
      state.status = 'void';
      state.error = null;
      return;
    },
    editing:{
      prepare: () => ({
        payload: {},
      }),
      reducer: (state) => {
        state.error = null;
        state.status = 'pending';
        return;
      },
    },
    fetching: {
      prepare: () => ({
        payload: {  },
      }),
      reducer: (state) => {
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
        state.error = action.payload.error;
        state.status = 'rejected';
        return;
      },
    },
  },
});

const { reset, editing, fetching, resolved, rejected } = actions;

export function fetchProfile() {
  return async (dispatch, getState) => {
    const { status } = selectProfile(getState());    
    const { token } = selectAuth(getState());
    if (status === 'pending') {
      return;
    }
    dispatch(fetching());
    try {
      const response = await fetch(
        PROFILE_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.status !== 200) {
        throw new Error(data.message);
      }
      dispatch(resolved(data.body));
    } catch (error) {
      dispatch(rejected(error));
    }
  };
}

export function editProfile(firstName, lastName) {
  return async (dispatch, getState) => {
    const { status,profileData } = selectProfile(getState());
    const { token } = selectAuth(getState());
    if (firstName.length === 0 && lastName.length === 0) {
      return;
    }

    if (status === 'pending') {
      return;
    }
    dispatch(editing());

    firstName.length === 0 ? firstName = profileData.firstName : firstName = firstName;
    lastName.length === 0 ? lastName = profileData.lastName : lastName = lastName;
    
    try {
      const response = await fetch(
        PROFILE_URL,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName,
            lastName,
          }),
        }
      );
      const data = await response.json();
      if (data.status !== 200) {
        throw new Error(data.message);
      }
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
