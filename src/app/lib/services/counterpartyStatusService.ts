import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import urls from "../urls";


export const counterpartyStatusService = createApi({
    reducerPath: 'counterpartyStatus',
    baseQuery: fetchBaseQuery({baseUrl: urls.COUNTERPARTY_STATUS}),
    tagTypes: ['counterpartyStatus'],
    endpoints:(build)=>({
        fetchCounterpartyStatus: build.query({
            query: () => ({
                url: '/GetAll',
                // params: {
                //     _limit: limit
                // }
            }),
        }),
    })
})
