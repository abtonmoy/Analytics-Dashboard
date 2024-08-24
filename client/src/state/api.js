import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "adminApi",
  tagTypes: [
    "Users",
    "Products",
    "Drivers",
    "Cars",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/users/${id}`,
      providesTags: ["Users"],
    }),
    getAuthUser: build.query({
      query: (id) => `general/users/${id}`,
      providesTags: ["Users"],
    }),
    getProducts: build.query({
      query: (id) => `general/products/${id}`,
      providesTags: ["Products"],
    }),
    getDrivers: build.query({
      query: () => "general/drivers",
      providesTags: ["Drivers"],
    }),
    addDriver: build.mutation({
      query: (newDriver) => ({
        url: "general/drivers",
        method: "POST",
        body: newDriver,
      }),
      invalidatesTags: ["Drivers"],
    }),
    deleteDriver: build.mutation({
      query: (id) => ({
        url: `general/drivers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Drivers"],
    }),

    getCars: build.query({
      query: () => "general/cars",
      providesTags: ["Cars"],
    }),
    addCar: build.mutation({
      query: (newCar) => ({
        url: "general/cars",
        method: "POST",
        body: newCar,
      }),
      invalidatesTags: ["Cars"],
    }),
    deleteCar: build.mutation({
      query: (id) => ({
        url: `general/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cars"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAuthUserQuery,
  useGetProductsQuery,
  useGetDriversQuery,
  useAddDriverMutation,
  useDeleteDriverMutation,
  useGetCarsQuery,
  useAddCarMutation,
  useDeleteCarMutation,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
