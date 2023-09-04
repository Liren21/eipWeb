import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import urls from "../urls";


export const subcontractorClassificationsService = createApi({
    reducerPath: 'subcontractorClassifications',
    baseQuery: fetchBaseQuery({baseUrl: urls.SUBCONTRACTOR_CLASSIFICATIONS}),
    tagTypes: ['subcontractorClassifications'],
    endpoints:(build)=>({
        fetchSubcontractorClassifications: build.query({
            query: () => ({
                url: '/GetAll',
                // params: {
                //     _limit: limit
                // }
            }),
        }),
    })
})
