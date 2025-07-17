

import { apiSlice } from "../../api/apiSlice"

 

const getBrand = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBrand : builder.query({
            query: () => `/users?role=brand`,
            providesTags: [{type: "Profile"}]
        })

    })
})

export const {useGetBrandQuery} = getBrand