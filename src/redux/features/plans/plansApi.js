import { apiSlice } from "../../api/apiSlice";

const plansApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminPlans: builder.query({
      query: () => `/plans/admin/all`,
      providesTags: ["Plans"],
    }),
    createPlan: builder.mutation({
      query: (body) => ({ url: `/plans`, method: "POST", body }),
      invalidatesTags: ["Plans"],
    }),
    updatePlan: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/plans/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Plans"],
    }),
    deletePlan: builder.mutation({
      query: (id) => ({ url: `/plans/${id}`, method: "DELETE" }),
      invalidatesTags: ["Plans"],
    }),
  }),
});

export const {
  useGetAdminPlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = plansApi;
