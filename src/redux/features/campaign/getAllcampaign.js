import { apiSlice } from "../../api/apiSlice"

 


const getAllCampaign = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCampaign: builder.query({
            query: () => `/campaigns/getAllCampaigns`,
            providesTags: [{type:"Campaign"}]
        })

    })
})

export const {useGetAllCampaignQuery} = getAllCampaign