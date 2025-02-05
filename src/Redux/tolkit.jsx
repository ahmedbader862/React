import { createSlice } from "@reduxjs/toolkit"
import arabic from "./Arabic"
import english from "./English"

const initialState = {
  lange: 'en',
  products: [],
  en: english,
  ar:arabic ,
  
  // allMovie : []
}




export const langeSlice = createSlice({
    name: 'langeSlice',
    initialState,
    reducers: {

      changeEn: (state, action) => { state.lange = action.payload },


      addProduct: (state, action) => { state.products = [...state.products, action.payload] },


      removeproduct: (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload);
    },
      

    },
  })
  
  
  export const { changeEn,addProduct,removeproduct  } = langeSlice.actions
  
  export default langeSlice.reducer
  