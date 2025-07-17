import { apiSlice } from "../../api/apiSlice"

 


const adminPaymentToInfluencer = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminPaymentToInfluencer: builder.query({
            query: (selectedYear) => `/dashboard/adminpaymentToInfluencerChart?year=${selectedYear}`,
            providesTags: [{type: "status"}]
        })

    })
})

export const {useAdminPaymentToInfluencerQuery} = adminPaymentToInfluencer