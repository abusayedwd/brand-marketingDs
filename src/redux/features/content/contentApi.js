import { apiSlice } from "../../api/apiSlice";

const contentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContent: builder.query({
      query: (key) => `/content/${key}`,
      providesTags: ["Content"],
    }),
    updateContent: builder.mutation({
      query: ({ key, title, body }) => ({
        url: `/content/${key}`,
        method: "PUT",
        body: { title, body },
      }),
      invalidatesTags: ["Content"],
    }),
  }),
});

export const { useGetContentQuery, useUpdateContentMutation } = contentApi;
