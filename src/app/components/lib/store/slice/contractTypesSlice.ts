import { createSlice, } from '@reduxjs/toolkit';
import {SignState} from "../models/SignState";
import {fetchContractTypes} from "../services/services";



interface ContractTypesSlice {
  contractTypes: SignState[];
}

const initialState: ContractTypesSlice = {
  contractTypes: [],
};

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
