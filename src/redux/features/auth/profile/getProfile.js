import { apiSlice } from "../../../api/apiSlice";

const getProfile = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => `/users/loggedInUser`,
      providesTags: [{ type: "Profile" }],
    }),
  }),
});

export const { useGetProfileQuery } = getProfile;
