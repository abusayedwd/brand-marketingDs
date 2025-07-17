 import { apiSlice } from "../../api/apiSlice"
 
  
 
 
 const adminEarning = apiSlice.injectEndpoints({
     endpoints: (builder) => ({
         adminEarning: builder.query({
             query: () => `/payments/dashbord-status`,
             providesTags: [{type:"Profile"}]
         })
 
     })
 })
 
 export const {useAdminEarningQuery} = adminEarning