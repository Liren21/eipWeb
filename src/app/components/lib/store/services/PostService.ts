import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import coreUrls from "../../../../core/lib/core-urls";


export const PostService = createApi({
    reducerPath: 'post',
    baseQuery: fetchBaseQuery({baseUrl: coreUrls.TEST_BACKEND}),
    tagTypes: ['post'],
    endpoints:(build)=>({
        fetchPost: build.query({
            query: () => ({
                url: '/post',
                // params: {
                //     _limit: limit
                // }
            }),
        }),
    })
})
