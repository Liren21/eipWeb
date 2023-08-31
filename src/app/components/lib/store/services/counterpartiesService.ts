import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import urls from "../../urls";


export const counterpartiesService = createApi({
    reducerPath: 'counterparties',
    baseQuery: fetchBaseQuery({baseUrl: urls.COUNTERPARTIES}),
    tagTypes: ['counterparties'],
    endpoints: (build) => ({
        fetchCounterparties: build.query({
            query: () => ({
                url: '/GetAll',
                // params: {
                //     _limit: limit
                // }
            }),
        }),
    })
})
