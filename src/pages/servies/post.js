import { API, API_KEYS } from './api';

export const postApi = API.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.query({
      query: (payload) => ({
        url: `/${API_KEYS.POSTS}`,
        method: 'GET',
        params: payload,
      }),
      providesTags: [API_KEYS.POSTS],
    }),
    addPost: builder.mutation({
      query: (payload) => ({
        url: `/${API_KEYS.POSTS}`,
        method: 'POST',
        body: payload,
      }),
      providesTags: [API_KEYS.POSTS],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/${API_KEYS.POSTS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [API_KEYS.POSTS],
    }),
  }),
});

export const { useGetPostQuery, useAddPostMutation, useDeletePostMutation } =
  postApi;
