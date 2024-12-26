import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';
import { NUMBERS, POST_VIEW } from './utils';
import { useGetPostQuery } from '../servies/post';

const PostContext = createContext();

export const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  console.log(startIndex);

  const reqObject = useMemo(
    () => ({
      _start: startIndex || NUMBERS.ZERO,
      _limit: NUMBERS.TEN,
    }),
    [startIndex]
  );

  console.log(reqObject);

  const { data: posts } = useGetPostQuery(reqObject);

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
        loading,
        error,
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
