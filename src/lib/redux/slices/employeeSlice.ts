import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const employeesURL = 'http://94.228.125.205:8080/employees'

type Employee = {
  id: number;
  lastName: string;
  firstName: string;
  patronymicName: string;
  departmentId: number;
  positionId: number;
}

interface EmployeeSliceState {
  employee: Employee[];
}

const initialState: EmployeeSliceState = {
  employee: [],
};

export const fetchEmployee = createAsyncThunk<Employee[]>('data/fetchEmployee', async () => {
  const { data } = await axios.get(employeesURL);
  return data;
});

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchEmployee.pending, (state) => {
      state.employee = [];
    });
    builder.addCase(fetchEmployee.fulfilled, (state, action) => {
      state.employee = action.payload;
    });
    builder.addCase(fetchEmployee.rejected, (state) => {
      state.employee = [];
    });
  },
});

export default employeeSlice.reducer;
