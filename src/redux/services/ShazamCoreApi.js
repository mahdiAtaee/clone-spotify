import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shazamApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '36d4024aeemshe15c57ef4d777f0p10bf25jsn930b2be4e2db')
      headers.set('X-RapidAPI-Host', 'shazam.p.rapidapi.com')

      return headers
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => ({
        url: '/charts/track',
        params: {
          locale: 'en-US',
          pageSize: '50',
          startFrom: '20',
        },
      }),
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => ({
        url: '/songs/v2/get-details',
        params: {
          id: songid,
          l: 'en-US',
        },
      }),
    }),
  }),
})

export const { useGetTopChartsQuery, useGetSongDetailsQuery } = shazamApi
