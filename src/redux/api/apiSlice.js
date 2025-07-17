

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     // baseUrl: "http://192.168.10.169:8083/api/v1",
//       baseUrl: "http://10.10.7.68:3050/v1",
//     prepareHeaders: (headers, { getState }) => {
//       const token = localStorage.getItem("token");
//     //   console.log("9 baseApi", token);
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ["Promotion", "Product", "Users", "Coupon", "About"],  

//   endpoints: () => ({}),
// });


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
  
    baseUrl: "https://sayed3050.sobhoy.com/v1", 
    // baseUrl: "http://10.10.7.68:3050/v1", 
    
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      // console.log("9 baseApi", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },

    
  }),
  tagTypes: ["Profile", "Campaign", "Withdraw", "Coupon", "About"],  

  endpoints: () => ({}),
});