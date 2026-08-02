

import { apiSlice } from "../../api/apiSlice";

const approvedWithdraw = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        approvedWithdraw: builder.mutation({
            query: ({ data, withdrawData, id }) => ({
                url: `/withdraw/Payment-approveWithdrawal/${id}`,
                method: "POST",
                body: data || withdrawData,
            }),
            invalidatesTags: [{ type: "Wallet" }],
        })
    })
})

  export const {useApprovedWithdrawMutation} = approvedWithdraw;