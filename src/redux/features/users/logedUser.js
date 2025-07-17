import { apiSlice } from "../../api/apiSlice"

 


const logedUser = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        logedUser: builder.query({
            query: () => `/users/loggedInUser`,
            providesTags: [{type:"Profile"}]
        })

    })
})

export const {useLogedUserQuery} = logedUser