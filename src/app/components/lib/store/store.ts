import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { contractTypesService,} from "./services/contractTypesService";
import {contractsService} from "./services/contractsService";
import {employeeService} from "./services/employeeService";
import {contractSignStatesService} from "./services/contractSignStatesService";
import {partnersService} from "./services/partnersService";
import {counterpartyFormatsService} from "./services/counterpartyFormatsService";
import {customerClassificationsService} from "./services/сustomerClassificationsService";



const rootReducer = combineReducers({

    [contractTypesService.reducerPath]: contractTypesService.reducer,
    [contractsService.reducerPath]: contractsService.reducer,
    [employeeService.reducerPath]: employeeService.reducer,
    [contractSignStatesService.reducerPath]: contractSignStatesService.reducer,
    [partnersService.reducerPath]: partnersService.reducer,
    [counterpartyFormatsService.reducerPath]: counterpartyFormatsService.reducer,
    [customerClassificationsService.reducerPath]: customerClassificationsService.reducer,




})
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
            contractTypesService.middleware,
            contractsService.middleware,
            employeeService.middleware,
            contractSignStatesService.middleware,
            partnersService.middleware,
            counterpartyFormatsService.middleware,
            customerClassificationsService.middleware,
            )
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
