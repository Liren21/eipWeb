import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

import urls from "../urls";


export const contractSignStatesService = createApi({
    reducerPath: 'contractSignStates',
    baseQuery: fetchBaseQuery({baseUrl: urls.CONTRACT_SIGN_STATES}),
    tagTypes: ['contractSignStates'],
    endpoints:(build)=>({
        fetchContractSignStates: build.query({
            query: () => ({
                url: '',
            }),
        }),
    })
})
