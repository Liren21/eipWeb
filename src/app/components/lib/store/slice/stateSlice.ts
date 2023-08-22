import { createSlice } from '@reduxjs/toolkit';
import {SignState} from "../models/SignState";
import {fetchSignStates} from "../services/services";



interface SignStatesSlice {
  signStates: SignState[];
}

const initialState: SignStatesSlice = {
  signStates: [],
};


const stateSlice = createSlice({
  name: 'signStates',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchSignStates.pending, (state) => {
      state.signStates = [];
    });
    builder.addCase(fetchSignStates.fulfilled, (state, action) => {
      state.signStates = action.payload;
    });
    builder.addCase(fetchSignStates.rejected, (state) => {
      state.signStates = [];
    });
  },
});

export default stateSlice.reducer;
