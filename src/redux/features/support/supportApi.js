import { apiSlice } from "../../api/apiSlice";

const supportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupportTickets: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        if (params.status) search.set("status", params.status);
        if (params.topic) search.set("topic", params.topic);
        if (params.page) search.set("page", params.page);
        if (params.limit) search.set("limit", params.limit || 50);
        const qs = search.toString();
        return `/support${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Support"],
    }),
    getSupportTicket: builder.query({
      query: (id) => `/support/${id}`,
      providesTags: (result, error, id) => [{ type: "Support", id }],
    }),
    updateSupportTicket: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/support/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Support", "Notification"],
    }),
  }),
});

export const {
  useGetSupportTicketsQuery,
  useGetSupportTicketQuery,
  useUpdateSupportTicketMutation,
} = supportApi;
