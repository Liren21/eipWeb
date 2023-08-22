import {createSlice} from '@reduxjs/toolkit';
import {SignState} from "../models/SignState";
import {fetchConsumers} from "../services/services";


interface ConsumerSlice {
    consumers: SignState[];
}

const initialState: ConsumerSlice = {
    consumers: [],
};


const consumersSlice = createSlice({
    name: 'consumers',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchConsumers.fulfilled, (state, action) => {
            state.consumers = action.payload;
        });
        builder.addCase(fetchConsumers.pending, (state) => {
            state.consumers = [];
        });
        builder.addCase(fetchConsumers.rejected, (state) => {
            state.consumers = [];
        });
    },
});

export default consumersSlice.reducer;
