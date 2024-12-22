import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const API_KEYS = {
  POSTS: 'posts',
};

export const API = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery(),
  endpoints: () => ({}),
}).enhanceEndpoints({
  addTagTypes: Object.values(API_KEYS),
});
