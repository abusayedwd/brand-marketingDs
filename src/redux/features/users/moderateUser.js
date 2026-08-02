import { apiSlice } from "../../api/apiSlice";

const moderateUserApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    moderateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/users/${id}/moderate`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useModerateUserMutation } = moderateUserApi;
