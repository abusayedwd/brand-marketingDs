import { apiSlice } from "../../api/apiSlice"

 


const adminEarningChart = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminEarningChart: builder.query({
            query: (selectedYear) => `/dashboard/adminEarning-chart?year=${selectedYear}`,
            providesTags: [{type: "status"}]
        })

    })
})

export const {useAdminEarningChartQuery} = adminEarningChart