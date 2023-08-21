import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const consumerURL = 'http://94.228.125.205:8080/partners'

type Consumer = {
  id: number;
  name: string;
};

interface ConsumerSlice {
  consumers: Consumer[];
}

const initialState: ConsumerSlice = {
  consumers: [],
};

export const fetchConsumers = createAsyncThunk<Consumer[]>('data/fetchConsumers', async () => {
  const { data } = await axios.get(consumerURL);
  return data;
});

const consumersSlice = createSlice({
  name: 'consumers',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchConsumers.pending, (state) => {
      state.consumers = [];
    });
    builder.addCase(fetchConsumers.fulfilled, (state, action) => {
      state.consumers = action.payload;
    });
    builder.addCase(fetchConsumers.rejected, (state) => {
      state.consumers = [];
    });
  },
});

export default consumersSlice.reducer;
