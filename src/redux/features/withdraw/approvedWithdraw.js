

import { apiSlice } from "../../api/apiSlice";

const approvedWithdraw = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        approvedWithdraw: builder.mutation({
            query: ({data,id}) => ({
                url: `/withdraw/Payment-approveWithdrawal/${id}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: [{type: "Wallet"}]
        })
    })
})

  export const {useApprovedWithdrawMutation} = approvedWithdraw;