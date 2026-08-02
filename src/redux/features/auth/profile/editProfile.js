import { apiSlice } from "../../../api/apiSlice";

const updateProfile = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: [{ type: "Profile" }],
    }),
  }),
});

export const { useUpdateProfileMutation } = updateProfile;
