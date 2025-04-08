'use client';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CONSTANT from '@/src/config/constant';

// Thunk to fetch tech news with page support
export const fetchTechNews = createAsyncThunk(
  'techNews/fetchTechNews',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_CORE_SERVER}${CONSTANT.TECH_NEWS_LIST_END_POINT}?page=${page}`
      );

      if (!response.ok) throw new Error(`Failed to fetch news: ${response.statusText}`);
      if (response.status === 204) return { data: [], page };

      const data = await response.json();
      return {
        data: data.content || [],
        page: page
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const techNewsSlice = createSlice({
  name: 'techNews',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    hasMore: true,
    currentPage: 0 // ✅ starts from 0 = nothing fetched yet
  },
  reducers: {
    resetTechNews: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
      state.hasMore = true;
      state.currentPage = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTechNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTechNews.fulfilled, (state, action) => {
        const { data, page } = action.payload;
        state.status = 'succeeded';
        state.items = [...state.items, ...data];
        state.hasMore = data.length > 0;
        state.currentPage = page; // ✅ set current page to latest fetched
      })
      .addCase(fetchTechNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetTechNews } = techNewsSlice.actions;
export default techNewsSlice.reducer;
