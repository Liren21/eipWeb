import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import urls from "../urls";


export const statusDOsService = createApi({
    reducerPath: 'statusDOs',
    baseQuery: fetchBaseQuery({baseUrl: urls.STATUS_DO}),
    tagTypes: ['statusDOs'],
    endpoints:(build)=>({
        fetchStatusDOs: build.query({
            query: () => ({
                url: '/GetAll',
            }),
        }),
    })
})
