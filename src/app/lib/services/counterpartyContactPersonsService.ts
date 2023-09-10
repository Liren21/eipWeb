import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import urls from "../urls";


export const counterpartyContactPersonsService = createApi({
    reducerPath: 'counterpartyContactPersons',
    baseQuery: fetchBaseQuery({baseUrl: urls.COUNTERPARTY_CONTACT_PERSONS}),
    tagTypes: ['counterpartyContactPersons'],
    endpoints: (build) => ({
        fetchCounterpartyContactPersons: build.query({
            query: () => ({
                url: '/GetAll',
                // params: {
                //     _limit: limit
                // }
            }),
        }),
    })
})
