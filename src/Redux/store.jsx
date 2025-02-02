import {  configureStore } from '@reduxjs/toolkit'
import langeReducer from './tolkit'


export const mystore = configureStore({
  reducer: { 
    lange: langeReducer,
 }, 
})
