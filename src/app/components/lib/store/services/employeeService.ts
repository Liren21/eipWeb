import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import coreUrls from "../../../../core/lib/core-urls";

export const employeeService = createApi({
    reducerPath: 'employee',
    baseQuery: fetchBaseQuery({baseUrl: coreUrls.BACKEND}),
    tagTypes: ['employee'],
    endpoints:(build)=>({
        fetchEmployee: build.query({
            query: () => ({
                url: '/employees',
                // params: {
                //     _limit: limit
                // }
            }),
        }),
    })
})
