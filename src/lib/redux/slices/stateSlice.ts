import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const contractURL = 'http://94.228.125.205:8080/contractSignStates'

type SignStates = {
  id: number;
  name: string;
};

interface SignStatesSlice {
  signStates: SignStates[];
}

const initialState: SignStatesSlice = {
  signStates: [],
};

export const fetchSignStates = createAsyncThunk<SignStates[]>('data/fetchSignStates', async () => {
  const { data } = await axios.get(contractURL);
  return data;
});

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
