import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import urls from "../../urls";


type ContractTypes = {
  id: number;
  name: string;
};

interface ContractTypesSlice {
  contractTypes: ContractTypes[];
}

const initialState: ContractTypesSlice = {
  contractTypes: [],
};

export const fetchContractTypes = createAsyncThunk<ContractTypes[]>('data/fetchContractTypes', async () => {
  const { data } = await axios.get(urls.CONTRACT_TYPES);
  return data;
});

const contractTypesSlice = createSlice({
  name: 'consumers',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchContractTypes.pending, (state) => {
      state.contractTypes = [];
    });
    builder.addCase(fetchContractTypes.fulfilled, (state, action) => {
      state.contractTypes = action.payload;
    });
    builder.addCase(fetchContractTypes.rejected, (state) => {
      state.contractTypes = [];
    });
  },
});

export default contractTypesSlice.reducer;
