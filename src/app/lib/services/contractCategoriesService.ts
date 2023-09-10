import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import urls from "../urls";


export const contractCategoriesService = createApi({
    reducerPath: 'contractCategories',
    baseQuery: fetchBaseQuery({baseUrl: urls.CONTRACT_CATEGORIES}),
    tagTypes: ['contractCategories'],
    endpoints:(build)=>({
        fetchContractSignStates: build.query({
            query: () => ({
                url: '/GetAll',
            }),
        }),
    })
})
