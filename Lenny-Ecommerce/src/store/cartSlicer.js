import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const cartSlicer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    
    addToCart: (state, action) => {
        state.value.push(action.payload)
    },

    removeFromCart: (state, action) =>{
        state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {addToCart, removeFromCart} = cartSlicer.actions

export default cartSlicer.reducer