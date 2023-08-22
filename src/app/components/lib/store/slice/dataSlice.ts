import {createSlice} from '@reduxjs/toolkit';
import {CreatedByEmployee} from "../models/CreatedByEmployee";
import {Contract} from "../models/Contract";
import {fetchData} from "../services/services";


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
