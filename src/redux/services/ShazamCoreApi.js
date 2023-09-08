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
        url: '/songs/get-details',
        params: {
          key: songid,
          locale: 'en-US',
        },
      }),
    }),
    getRelatedSongs: builder.query({
      query: ({ songid }) => ({
        url: '/songs/get-related-artist',
        params: {
          id: songid,
          l: 'en-US',
        },
      }),
    }),
    getArtistDetails: builder.query({
      query: ({ artistId }) => ({
        url: '/artists/get-details',
        params: {
          id: artistId,
          l: 'en-US',
        },
      }),
    }),
    getArtistTopSongs: builder.query({
      query: ({ artistId }) => ({
        url: '/artists/get-top-songs',
        params: {
          id: artistId,
          l: 'en-US',
        },
      }),
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => ({
        url: '/charts/track',
        params: {
          locale: countryCode,
        },
      }),
    }),
    getSongsBySearch: builder.query({
      query: (term) => ({
        url: '/search',
        params: {
          term,
          locale: 'en-US',
          offset: '0',
          limit: '10',
        },
      }),
    }),
  }),
})

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
  useGetArtistDetailsQuery,
  useGetArtistTopSongsQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
} = shazamApi
