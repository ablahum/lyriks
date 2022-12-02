import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCore = createApi({
  reducerPath: 'shazamCore',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '97754c5d38msh353e1df8719b9f8p105376jsnebac6906d644');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/world' }),
    getSongsByGenre: builder.query({ query: (genre) => `/charts/genre-world?genre_code=${genre}` }),
    getSongsByCountry: builder.query({ query: (countryCode) => `/charts/country?country_code=${countryCode}` }),
    getSongsBySearch: builder.query({ query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query==${searchTerm}` }),
    getSongDetails: builder.query({ query: ({ songId }) => `/tracks/details?track_id=${songId}` }),
    getSongRelated: builder.query({ query: ({ songId }) => `/tracks/related?track_id=${songId}` }),
    getArtistDetails: builder.query({ query: (artistId) => `/artists/details?artist_id=${artistId}` }),
  }),
});

export const { useGetTopChartsQuery, useGetSongsByGenreQuery, useGetSongsBySearchQuery, useGetSongDetailsQuery, useGetSongRelatedQuery, useGetArtistDetailsQuery, useGetSongsByCountryQuery } = shazamCore;
