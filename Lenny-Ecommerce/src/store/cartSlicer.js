import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const cartSlicer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    

    basketSize: (state, action)=>{
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {addToCart, removeFromCart, basketSize} = cartSlicer.actions

export default cartSlicer.reducer