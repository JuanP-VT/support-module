import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const supportModuleApi = createApi({
  reducerPath: "supportModuleApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://nestjs-technical-test-production.up.railway.app/api/support-reports",
  }),
  tagTypes: ["SupportReports"],
  endpoints: (builder) => ({
    getSupportReports: builder.query({
      query: () => "",
      providesTags: ["SupportReports"],
    }),
    createSupportReport: builder.mutation({
      query: (body) => ({
        method: "POST",
        body,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["SupportReports"],
    }),
    updateSupportReport: builder.mutation({
      query: ({ id, body }) => ({
        method: "PATCH",
        url: `/${id}`,
        body,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["SupportReports"],
    }),
    deleteSupportReport: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/${id}`,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["SupportReports"],
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
