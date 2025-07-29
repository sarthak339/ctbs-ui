import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CONSTANT from "../config/constant";

// Async thunk for fetching latest blogs
export const latestBlogs = createAsyncThunk(
  "blogs/latestBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_CORE_SERVER}${CONSTANT.LATEST_BLOGS_API}` // ✅ fixed constant name
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.statusText}`);
      }

      if (response.status === 204) {
        return []; // no content
      }

      const data = await response.json();
      return data.result || []; // ✅ fallback if "result" not present
    } catch (error) {
      return rejectWithValue(error?.message || "Search failed");
    }
  }
);

// Slice
const blogLatestSlice = createSlice({
  name: "latestBlogs",
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
      .addCase(latestBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(latestBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(latestBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error occurred";
      });
  },
});

// Export actions and reducer
export const { clearSearchResults } = blogLatestSlice.actions;
export default blogLatestSlice.reducer;
