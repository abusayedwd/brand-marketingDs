import { apiSlice } from "../../../api/apiSlice";

const getProfile = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => `/common/self`
        })
    })
})

export const {useGetProfileQuery} = getProfile;