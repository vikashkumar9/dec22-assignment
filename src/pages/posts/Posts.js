import React from 'react';
import { PostProvider } from './usePosts';
import PostsWrapper from './PostsWrapper';
import { Provider } from 'react-redux';
import store from '../servies/store';

const Posts = () => {
  return (
    <Provider store={store}>
      <PostProvider>
        <PostsWrapper />
      </PostProvider>
    </Provider>
  );
};

export default Posts;
