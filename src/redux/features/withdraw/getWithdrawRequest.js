 
import { apiSlice } from "../../api/apiSlice"

 

const getWithdrawRequest = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWithdrawRequest : builder.query({
            query: () => `/withdraw/getAllWithdrawalRequests`,
            providesTags: [{type: "Wallet"}]
        })

    })
})

export const {useGetWithdrawRequestQuery} = getWithdrawRequest