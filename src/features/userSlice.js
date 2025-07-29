// src/features/subscribeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CONSTANT from "../config/constant";

// Async thunk for subscribing
export const addSubscriber = createAsyncThunk(
  "subscribe/addSubscriber",
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_CORE_SERVER}${CONSTANT.SUBSCRIBED_USERS_API}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to subscribe");
      }

      const data = await response.json();
      return data; // { message: "Subscription successful", data: {...} }
    } catch (error) {
      return rejectWithValue("Network error, please try again");
    }
  }
);

const subscribeSlice = createSlice({
  name: "subscribe",
  initialState: {
    successMessage: null,
    errorMessage: null,
    loading: false,
  },
  reducers: {
    clearMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSubscriber.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(addSubscriber.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(addSubscriber.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { clearMessages } = subscribeSlice.actions;
export default subscribeSlice.reducer;
