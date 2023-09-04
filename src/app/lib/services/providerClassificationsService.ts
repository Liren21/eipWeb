import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import urls from "../urls";


export const providerClassificationsService = createApi({
    reducerPath: 'providerClassifications',
    baseQuery: fetchBaseQuery({baseUrl: urls.PROVIDER_CLASSIFICATIONS}),
    tagTypes: ['providerClassifications'],
    endpoints:(build)=>({
        fetchProviderClassificationsService: build.query({
            query: () => ({
                url: '/GetAll',
                // params: {
                //     _limit: limit
                // }
            }),
        }),
    })
})
