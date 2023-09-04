import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import urls from "../urls";


export const partnersService = createApi({
    reducerPath: 'partners',
    baseQuery: fetchBaseQuery({baseUrl: urls.PARTNERS}),
    tagTypes: ['partners'],
    endpoints:(build)=>({
        fetchPartners: build.query({
            query: () => ({
                url: '',
                // params: {
                //     _limit: limit
                // }
            }),
        }),
    })
})
