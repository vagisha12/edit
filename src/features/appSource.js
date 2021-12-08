import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    chatWindowID: null,
  },
  reducers: {
    enterRoom: (state, action) => {
      state.chatWindowID = action.payload.chatWindowID;
    },
  },
});

export const { enterRoom } = appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.app.value)`
export const selectRoomId = (state) => state.app.chatWindowID;

export default appSlice.reducer;
