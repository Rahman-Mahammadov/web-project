import { configureStore } from '@reduxjs/toolkit'
import categorySlicer from './categorySlicer'
import searchInputSlicer from './searchInputSlicer'
import cartSlicer from './cartSlicer'
import authSlicer from './authSlicer'

export const store = configureStore({
  reducer: {
    category: categorySlicer,
    input:searchInputSlicer,
    cart:cartSlicer,
    auth:authSlicer

  },
})