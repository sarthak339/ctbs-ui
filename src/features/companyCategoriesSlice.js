
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CONSTANT from '@/src/config/constant';


export const fetchCompanyCategories = createAsyncThunk(
  'companyCategory/fetchCompanyCategories',
  async (category,{ rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_CORE_SERVER}${CONSTANT.COMPANY_LIST_END_POINT}`);
      if (!response.ok) {
        throw new Error('Failed to fetch companies');
      }
      const data = await response.json();
      return data.result; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const companyCategorySlice = createSlice({
  name: 'companyCategory',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyCategories.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchCompanyCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCompanyCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default companyCategorySlice.reducer;
