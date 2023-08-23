import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import coreUrls from "../../../../core/lib/core-urls";


export const contractSignStatesService = createApi({
    reducerPath: 'contractSignStates',
    baseQuery: fetchBaseQuery({baseUrl: coreUrls.BACKEND}),
    tagTypes: ['contractSignStates'],
    endpoints:(build)=>({
        fetchContractSignStates: build.query({
            query: () => ({
                url: '/contractSignStates',

            }),
        }),
    })
})
