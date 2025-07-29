// store/slices/filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: "AI", 
  selectedCompany: "ALL",  
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setCompany: (state, action) => {
      state.selectedCompany = action.payload;
    },
    clearFilters: (state) => {
      state.selectedCategory = "";
      state.selectedCompany = "";
    },

    
  },
});

export const { setCategory, setCompany, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
