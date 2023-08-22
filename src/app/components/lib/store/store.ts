import {combineReducers, configureStore} from '@reduxjs/toolkit';
import data from './slice/dataSlice';
import employee from './slice/employeeSlice';
import signStates from './slice/stateSlice';
import consumers from './slice/consumerSlice';
import contractTypes from './slice/contractTypesSlice';
import {contractTypesApi} from "./services/services";

const rootReducer = combineReducers({
    data,
    employee,
    signStates,
    consumers,
    contractTypes,
    [contractTypesApi.reducerPath]: contractTypesApi.reducer,

})
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(contractTypesApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
