import { apiSlice } from "../../api/apiSlice";

const rejectWithdrawApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    rejectWithdraw: builder.mutation({
      query: ({ id, rejectionReason }) => ({
        url: `/withdraw/rejectWithdrawal/${id}`,
        method: "POST",
        body: { rejectionReason },
      }),
      invalidatesTags: [{ type: "Wallet" }],
    }),
  }),
});

export const { useRejectWithdrawMutation } = rejectWithdrawApi;
