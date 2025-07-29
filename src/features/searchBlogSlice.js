// store/slices/searchBlogsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CONSTANT from "../config/constant";

export const searchBlogs = createAsyncThunk(
  "blogs/searchBlogs",
  async (searchText, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_CORE_SERVER}${CONSTANT.SEARCH_BLOGS_API}?search=${encodeURIComponent(searchText)}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.statusText}`);
      }

      if (response.status === 204) {
        return [];
      }

      const data = await response.json();
      return data.result || []; // <-- safety fallback
    } catch (error) {
      return rejectWithValue(error.message || "Search failed");
    }
  }
);

const searchBlogsSlice = createSlice({
  name: "searchBlogs",
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSearchResults(state) {
      state.results = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error occurred";
      });
  },
});

export const { clearSearchResults } = searchBlogsSlice.actions;

export default searchBlogsSlice.reducer;
