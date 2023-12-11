import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const categorySlicer = createSlice({
  name: 'category',
  initialState,
  reducers: {
    
    changeCategory: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {changeCategory} = categorySlicer.actions

export default categorySlicer.reducer