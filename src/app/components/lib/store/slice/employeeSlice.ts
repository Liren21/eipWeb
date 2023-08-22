import { createSlice } from '@reduxjs/toolkit';
import {Employee} from "../models/Employee";
import {fetchEmployee} from "../services/services";



interface EmployeeSliceState {
  employee: Employee[];
}

const initialState: EmployeeSliceState = {
  employee: [],
};


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
