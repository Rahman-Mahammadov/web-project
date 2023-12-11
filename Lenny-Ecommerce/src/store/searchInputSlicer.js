import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const searchInputSlicer = createSlice({
  name: 'input',
  initialState,
  reducers: {
    
    inputSearch: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {inputSearch} = searchInputSlicer.actions

export default searchInputSlicer.reducer