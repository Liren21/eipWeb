import { configureStore } from '@reduxjs/toolkit';
import data from './slices/dataSlice';
import employee from './slices/employeeSlice';
import signStates from './slices/stateSlice';
import consumers from './slices/consumerSlice';
import contractTypes from './slices/contractTypesSlice';

export const store = configureStore({
  reducer: {
    data,
    employee,
    signStates,
    consumers,
    contractTypes
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
