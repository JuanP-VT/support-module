import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const supportModuleApi = createApi({
  reducerPath: "supportModuleApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://nestjs-technical-test-production.up.railway.app/api/support-reports",
  }),
  endpoints: (builder) => ({
    getSupportReports: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetSupportReportsQuery, useLazyGetSupportReportsQuery } =
  supportModuleApi;
