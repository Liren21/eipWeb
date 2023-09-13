import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import urls from "../urls";


export const rasesService = createApi({
    reducerPath: 'rases',
    baseQuery: fetchBaseQuery({baseUrl: urls.RASES}),
    tagTypes: ['rases'],
    endpoints:(build)=>({
        fetchRases: build.query({
            query: () => ({
                url: '/GetAll',
            }),
        }),
    })
})
