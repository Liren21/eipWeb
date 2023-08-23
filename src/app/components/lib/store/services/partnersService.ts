import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import coreUrls from "../../../../core/lib/core-urls";


export const partnersService = createApi({
    reducerPath: 'partners',
    baseQuery: fetchBaseQuery({baseUrl: coreUrls.BACKEND}),
    tagTypes: ['partners'],
    endpoints:(build)=>({
        fetchPartners: build.query({
            query: () => ({
                url: '/partners',
                // params: {
                //     _limit: limit
                // }
            }),
        }),
    })
})
