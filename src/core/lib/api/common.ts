import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const GetFetch = (url) => {
    return createAsyncThunk('data/fetchContractTypes', async () => {
        const {data} = await axios.get(url);
        return data;
    })

}
