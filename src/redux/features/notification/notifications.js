import { apiSlice } from "../../api/apiSlice";

const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminNotifications: builder.query({
      query: () => `/notifications?limit=30`,
      providesTags: ["Notification"],
    }),
    markAdminNotificationRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "POST",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetAdminNotificationsQuery,
  useMarkAdminNotificationReadMutation,
} = notificationsApi;
