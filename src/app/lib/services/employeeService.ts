import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import urls from "../urls";

export const employeeService = createApi({
    reducerPath: 'employeeOne',
    baseQuery: fetchBaseQuery({baseUrl: urls.EMPLOYEES}),
    tagTypes: ['employeeOne'],
    endpoints:(build)=>({
        fetchEmployee: build.query({
            query: () => ({
                url: '',
                // params: {
                //     _limit: limit
                // }
            }),
        }),
    })
})
