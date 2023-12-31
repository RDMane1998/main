
import { Video_API, Search_API } from "../../constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getLorems = createAsyncThunk(
  "getLorems",
  async (object, { getState, rejectWithValue }) => {
    console.log(getState());
    try {
      const data = await fetch(Video_API);
      const json1 = await data.json();
      return json1.items;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const getSearchVideo = createAsyncThunk(
  "getSearchVideo",
  async (value: string, { rejectWithValue }) => {
    try {
      const data = await fetch(Search_API + value);
      const json1 = await data.json();
      return json1.items;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const loremSlice = createSlice({
  name: "lorem",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLorems.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getLorems.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
        state.isSuccess = true;
      })
      .addCase(getLorems.rejected, (state, { payload }) => {
        state.loading = false;
        state.isSuccess = false;
        state.message = "failed";
      })
      .addCase(getSearchVideo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSearchVideo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
        state.isSuccess = true;
      })
      .addCase(getSearchVideo.rejected, (state, { payload }) => {
        state.loading = false;
        state.isSuccess = false;
        state.message = "failed";
      });
  },
});

export default loremSlice;
