import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
};

const userNameSlice = createSlice({
  name: 'userName',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUserName } = userNameSlice.actions;

export default userNameSlice.reducer;
