import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import urls from "../../urls";
import {ISignState, SignState} from "../models/SignState";
import {Contract} from "../models/Contract";
import {Employee} from "../models/Employee";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import coreUrls from "../../../../core/lib/core-urls";
import {ITest, Test} from "../models/Test";




export const fetchContractTypes = createAsyncThunk<ISignState[]>('data/fetchContractTypes', async () => {
    const { data } = await axios.get(urls.CONTRACT_TYPES);
    return data;
});
export const contractTypesApi = createApi({
    reducerPath: 'posts',
    baseQuery: fetchBaseQuery({baseUrl: coreUrls.TEST_BACKEND}),
    tagTypes: ['Post'],
    endpoints:(build)=>({
        fetchPosts: build.query<ITest[],number>({
            query: () => ({
                url: `/posts`,
            }),

        }),
    })
})

export const fetchConsumers = createAsyncThunk<ISignState[]>('data/fetchConsumers', async () => {
    const {data} = await axios.get(urls.PARTNERS);
    return data;
});

export const fetchData = createAsyncThunk<Contract[]>('data/fetchData', async () => {
    const { data } = await axios.get(urls.CONTRACTS);
    return data;
});

export const fetchEmployee = createAsyncThunk<Employee[]>('data/fetchEmployee', async () => {
    const { data } = await axios.get(urls.EMPLOYEES);
    return data;
});

export const fetchSignStates = createAsyncThunk<SignState[]>('data/fetchSignStates', async () => {
    const { data } = await axios.get(urls.CONTRACT_SIGN_STATE);
    return data;
});
