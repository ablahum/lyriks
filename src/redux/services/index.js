import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCore = createApi({
  reducerPath: 'shazamCoreApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '97754c5d38msh353e1df8719b9f8p105376jsnebac6906d644');

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/world' }),
  }),
});

export const { useGetTopChartsQuery } = shazamCore;
