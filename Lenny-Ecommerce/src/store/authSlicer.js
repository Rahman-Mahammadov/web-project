import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: null,
  }


const authSlicer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = authSlicer.actions;
export default authSlicer.reducer;