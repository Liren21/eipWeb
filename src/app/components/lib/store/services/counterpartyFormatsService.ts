import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import coreUrls from "../../../../core/lib/core-urls";


export const counterpartyFormatsService = createApi({
    reducerPath: 'CounterpartyFormats',
    baseQuery: fetchBaseQuery({baseUrl: `${coreUrls.BACKEND}/CounterpartyFormats`}),
    tagTypes: ['CounterpartyFormats'],
    endpoints: (build) => ({
        fetchCounterpartyFormats: build.query({
            query: () => ({
                url: '/GetAll',
                // params: {
                //     _limit: limit
                // }
            }),
        }),
    })
})
