import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import urls from "../../urls";



type Type = {
  id: number;
  name: string;
  sortIndex: number;
  groupLetter: string;
  isBasic: boolean;
}

type Consumer = {
  id: number;
  name: string;
  consumerClassification: string;
}

type DepartmentCreatedByEmployee = {
  id: number;
  name: string;
  sortIndex: number;
  isConsumer: boolean;
}

type DepartmentInvolvedByEmployee = {
  id: number;
  parentId: number;
  name: string;
  sortName: string;
  sortIndex: number;
}

type InvolvedByEmployee = {
  id: number;
  lastName: string;
  firstName: string;
  patronymicName: string;
  departmentId: number;
  positionId: number;
  department: DepartmentInvolvedByEmployee;
}

type SignState = {
  id: number;
  name: string;
}

export type CreatedByEmployee = {
  id: number;
  lastName: string;
  firstName: string;
  patronymicName: string;
  departmentId: number;
  positionId: number;
  department?: DepartmentCreatedByEmployee;
}

type Contract = {
  id: number;
  created: string;
  createdByEmployeeId: number;
  createdByEmployee: CreatedByEmployee;
  signStateId: number;
  signState: SignState;
  involvedByEmployeeId: number;
  involvedByEmployee: InvolvedByEmployee;
  consumerId: number;
  consumer: Consumer;
  typeId: number;
  type: Type;
  number: string;
  agreementNumber: string;
  address: string;
  isValid: boolean;
};

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface DataSliceState {
  createdByEmployee: CreatedByEmployee[];
  contracts: Contract[];
  status: Status;
}

const initialState: DataSliceState = {
  createdByEmployee: [],
  contracts: [],
  status: Status.LOADING,
};

export const fetchData = createAsyncThunk<Contract[]>('data/fetchData', async () => {
  const { data } = await axios.get(`${urls.COUNTERPARTY_STATUS}/GetAll`);
  return data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.status = Status.LOADING;
      state.contracts = [];
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.contracts = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.status = Status.ERROR;
      state.contracts = [];
    });
  },
});

export default dataSlice.reducer;
