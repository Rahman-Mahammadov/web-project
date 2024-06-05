import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: true,
}

export const basketSlicer = createSlice({
  name: 'basketRefreshed',
  initialState,
  reducers: {
    

    isBasketRefreshed: (state)=>{
      state.value = !state.value
    }
  },
})

// Action creators are generated for each case reducer function
export const {isBasketRefreshed} = basketSlicer.actions

export default basketSlicer.reducer