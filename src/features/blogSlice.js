
'use client';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CONSTANT from '@/src/config/constant';


export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async ({category,company},  { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_CORE_SERVER}${CONSTANT.BLOGS_LIST_END_POINT}?category=${category}&company=${company}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.statusText}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
