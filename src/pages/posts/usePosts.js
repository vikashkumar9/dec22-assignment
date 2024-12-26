import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';
import { NUMBERS, POST_VIEW } from './utils';
import { useGetPostQuery } from '../servies/post';

const PostContext = createContext();

export const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const PostProvider = ({ children }) => {
  const [query, setQuery] = useQueryParams({
    view: StringParam,
    postId: NumberParam,
    currentPage: NumberParam,
  });

  const { currentPage } = query;

  const startIndex = useMemo(
    () => (currentPage - NUMBERS.ONE) * NUMBERS.TEN || NUMBERS.ZERO,
    [currentPage]
  );

  const reqObject = useMemo(
    () => ({
      _start: startIndex || NUMBERS.ZERO,
      _limit: NUMBERS.TEN,
    }),
    [startIndex]
  );

  const {
    data: posts,
    isLoading: isLoadingPosts,
    isFetching: isFetchingPosts,
  } = useGetPostQuery(reqObject);

  useEffect(() => {
    setQuery((query) => ({
      ...query,
      view: POST_VIEW.LIST,
      currentPage: NUMBERS.ONE,
    }));
  }, [setQuery]);

  return (
    <PostContext.Provider
      value={{
        posts,
        isLoadingPosts,
        isFetchingPosts,
        query,
        setQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostContext);
};

export default PostContext;
