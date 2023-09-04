import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import coreUrls from "../../../core/lib/core-urls";
import {IContract} from "../models/Contract";


export const contractsService = createApi({
    reducerPath: 'contracts',
    baseQuery: fetchBaseQuery({baseUrl: coreUrls.BACKEND}),
    tagTypes: ['contracts'],
    endpoints: (build) => ({
        fetchContracts: build.query({
            query: () => ({
                url: '/contracts',
                // params: {
                //     _limit: limit
                // }
            }),
            providesTags: result => ['contracts']
        }),
        createContract: build.mutation<IContract,IContract>({
            query: (contract) => ({
                url: `/contracts`,
                method: 'POST',
                body: contract
            }),
            invalidatesTags: ['contracts']
        }),
    })
})
