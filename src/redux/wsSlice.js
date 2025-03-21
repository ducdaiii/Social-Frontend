import { createSlice } from "@reduxjs/toolkit";

const wsSlice = createSlice({
    name: 'cryptoWebSocket',
    initialState: {},
    reducers: {
      updatePrice: (state, action) => {
        const { asset_id, price } = action.payload;
        state[asset_id] = price;
      },
    },
  });
  
  export const { updatePrice } = wsSlice.actions;
  export default wsSlice.reducer;