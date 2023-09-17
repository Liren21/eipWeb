import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IContract} from "../models/Contract";
import urls from "../urls";


export const contractsService = createApi({
    reducerPath: 'contracts',
    baseQuery: fetchBaseQuery({baseUrl: urls.CONTRACTS}),
    tagTypes: ['contracts'],
    endpoints: (build) => ({
        fetchContracts: build.query({
            query: () => ({
                url: '',
                // params: {
                //     _limit: limit
                // }
            }),
            providesTags: result => ['contracts']
        }),
        createContract: build.mutation<IContract,IContract>({
            query: (contract) => ({
                url: ``,
                method: 'POST',
                body: contract
            }),
            invalidatesTags: ['contracts']
        }),
    })
})
