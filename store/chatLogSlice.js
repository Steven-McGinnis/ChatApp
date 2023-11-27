import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatLog: [],
};

const chatLogSlice = createSlice({
  name: 'chatLog',
  initialState,
  reducers: {
    setChatLog: (state, action) => {
      state.chatLog = action.payload;
    },
    addMessage: (state, action) => {
      state.chatLog.push(action.payload);
    },
    clearChatLog: (state) => {
      state.chatLog = [];
    },
  },
});

export const { setChatLog, addMessage, clearChatLog } = chatLogSlice.actions;

export default chatLogSlice.reducer;
