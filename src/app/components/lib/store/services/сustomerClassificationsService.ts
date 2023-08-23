import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import coreUrls from "../../../../core/lib/core-urls";


export const customerClassificationsService = createApi({
    reducerPath: 'customerClassifications',
    baseQuery: fetchBaseQuery({baseUrl: `${coreUrls.BACKEND}/customerClassifications`}),
    tagTypes: ['customerClassifications'],
    endpoints: (build) => ({
        fetchCustomerClassifications: build.query({
            query: () => ({
                url: '/GetAll',
                // params: {
                //     _limit: limit
                // }
            }),
        }),
    })
})
