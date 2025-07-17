import { apiSlice } from "../../api/apiSlice"

 

const contentCreator = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        contentCreator: builder.query({
            query: () => `/users?role=influencer`,
            providesTags: [{type: "Profile"}]
        })

    })
})

export const {useContentCreatorQuery} = contentCreator