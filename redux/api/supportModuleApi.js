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
    createSupportReport: builder.mutation({
      query: (body) => ({
        method: "POST",
        body,
        responseHandler: (response) => response.text(),
      }),
    }),
    updateSupportReport: builder.mutation({
      query: ({ id, body }) => ({
        method: "PATCH",
        url: `/${id}`,
        body,
        responseHandler: (response) => response.text(),
      }),
    }),
    deleteSupportReport: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/${id}`,
        responseHandler: (response) => response.text(),
      }),
    }),
  }),
});

export const {
  useGetSupportReportsQuery,
  useLazyGetSupportReportsQuery,
  useCreateSupportReportMutation,
  useUpdateSupportReportMutation,
  useDeleteSupportReportMutation,
} = supportModuleApi;
