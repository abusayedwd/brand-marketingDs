import { apiSlice } from "../../api/apiSlice";

const updateAdmin = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAdmin : builder.mutation({
            query: ({formData,id}) => ({
                url: `/users/${id}`,
                method: "PATCH",
                body: formData
            }),
            invalidatesTags: ["Users", "Profile"],
        })
    })
})

export const {useUpdateAdminMutation} = updateAdmin;