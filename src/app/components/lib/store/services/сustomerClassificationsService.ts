import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import urls from "../../urls";


export const customerClassificationsService = createApi({
    reducerPath: 'customerClassifications',
    baseQuery: fetchBaseQuery({baseUrl:urls.CUSTOMER_CLASSIFICATIONS}),
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
        postCustomerClassifications: build.mutation<any,any>(({
            query:(classifications)=>({
                url:'',
                method:'POST',
                body: classifications
            }),
            invalidatesTags: ['customerClassifications']
        })),
        updateCustomerClassifications: build.mutation<any,any>({
            query: (post) => ({
                url: ``,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['customerClassifications']
        }),
        deleteCustomerClassifications: build.mutation<any,any>({
            query: (post) => ({
                url: `/${post.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['customerClassifications']
        }),
    })
})
