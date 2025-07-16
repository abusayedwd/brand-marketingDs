import { apiSlice } from "../../../api/apiSlice";


const updateProfile = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateProfile: builder.mutation({
            query : (data) => ({
                url: `/common/self`,
                method: "PUT",
                body: data
            })
        })
    })
})

export const {useUpdateProfileMutation} = updateProfile;