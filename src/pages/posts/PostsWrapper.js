import React from 'react';
import ListPosts from './ListPosts';
import AddPosts from './AddPosts';
import { POST_VIEW } from './utils';
import ViewPost from './ViewPost';
import { usePosts } from './usePosts';
import BackButton from '../backButton/BackButton';

const PostsWrapper = () => {
  const { query, setQuery } = usePosts();

  const { view, postId } = query;

  const handleView = (view, id) => {
    setQuery((query) => ({ ...query, view, postId: id }));
  };

  return (
    <div className='container mx-auto p-4'>
      <BackButton />
      {POST_VIEW.LIST === view && <ListPosts handleView={handleView} />}
      {POST_VIEW.VIEW === view && (
        <ViewPost handleView={handleView} postId={postId} />
      )}
      {POST_VIEW.ADD === view && <AddPosts handleView={handleView} />}
    </div>
  );
};

export default PostsWrapper;
