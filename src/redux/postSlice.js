import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allPosts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts(state, action) {
      state.allPosts = action.payload;
    },
  },
});

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
