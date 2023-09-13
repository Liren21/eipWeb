import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { contractTypesService,} from "../services/contractTypesService";
import {contractsService} from "../services/contractsService";
import {employeeService} from "../services/employeeService";
import {contractSignStatesService} from "../services/contractSignStatesService";
import {partnersService} from "../services/partnersService";
import {counterpartyFormatsService} from "../services/counterpartyFormatsService";
import {customerClassificationsService} from "../services/сustomerClassificationsService";
import {subcontractorClassificationsService} from "../services/subcontractorClassificationsService";
import {providerClassificationsService} from "../services/providerClassificationsService";
import {counterpartyStatusService} from "../services/counterpartyStatusService";
import data from './slices/dataSlice';
import employee from './slices/employeeSlice';
import signStates from './slices/stateSlice';
import consumers from './slices/consumerSlice';
import contractTypes from './slices/contractTypesSlice';
import {counterpartiesService} from "../services/counterpartiesService";
import {contractCategoriesService} from "../services/contractCategoriesService";
import {statusDOsService} from "../services/statusDOsService";
import {counterpartyContactPersonsService} from "../services/counterpartyContactPersonsService";
import {rasesService} from "../services/rasesService";

const rootReducer = combineReducers({
    data,
    employee,
    signStates,
    consumers,
    contractTypes,
    [contractTypesService.reducerPath]: contractTypesService.reducer,
    [contractsService.reducerPath]: contractsService.reducer,
    [employeeService.reducerPath]: employeeService.reducer,
    [contractSignStatesService.reducerPath]: contractSignStatesService.reducer,
    [partnersService.reducerPath]: partnersService.reducer,
    [counterpartyFormatsService.reducerPath]: counterpartyFormatsService.reducer,
    [customerClassificationsService.reducerPath]: customerClassificationsService.reducer,
    [subcontractorClassificationsService.reducerPath]: subcontractorClassificationsService.reducer,
    [providerClassificationsService.reducerPath]: providerClassificationsService.reducer,
    [counterpartyStatusService.reducerPath]: counterpartyStatusService.reducer,
    [counterpartiesService.reducerPath]: counterpartiesService.reducer,
    [contractCategoriesService.reducerPath]: contractCategoriesService.reducer,
    [statusDOsService.reducerPath]: statusDOsService.reducer,
    [counterpartyContactPersonsService.reducerPath]: counterpartyContactPersonsService.reducer,
    [rasesService.reducerPath]: rasesService.reducer,




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
            subcontractorClassificationsService.middleware,
            providerClassificationsService.middleware,
            counterpartyStatusService.middleware,
            counterpartiesService.middleware,
            contractCategoriesService.middleware,
            statusDOsService.middleware,
            counterpartyContactPersonsService.middleware,
            rasesService.middleware,
            )
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
