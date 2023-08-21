import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import urls from "../../urls";
import {ISignState, SignState} from "../models/SignState";
import {Contract} from "../models/Contract";
import {Employee} from "../models/Employee";


export const fetchContractTypes = createAsyncThunk<ISignState[]>('data/fetchContractTypes', async () => {
    const { data } = await axios.get(urls.CONTRACT_TYPES);
    return data;
});
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
