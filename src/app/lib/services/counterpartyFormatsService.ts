import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import coreUrls from "../../../core/lib/core-urls";
import urls from "../urls";


export const counterpartyFormatsService = createApi({
    reducerPath: 'CounterpartyFormats',
    baseQuery: fetchBaseQuery({baseUrl: urls.COUNTERPARTY_FORMATS}),
    tagTypes: ['CounterpartyFormats'],
    endpoints: (build) => ({
        fetchCounterpartyFormats: build.query({
            query: () => ({
                url: '/GetAll',
                // params: {
                //     _limit: limit
                // }
            }),
        }),
    })
})
