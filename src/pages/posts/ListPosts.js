import React, { useEffect } from 'react';
import { usePosts } from './usePosts';
import { func } from 'prop-types';
import { NUMBERS, POST_VIEW } from './utils';
import AlertSnackbar from './AlertSnackBar';
import { useDeletePostMutation } from '../servies/post';

const ListPosts = ({ handleView }) => {
  const { posts, setQuery, query } = usePosts();

  const { currentPage } = query;

  const [
    deletePost,
    { error: isDeleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeletePostMutation();

  const handleDelete = (id) => {
    deletePost(id);
  };

  const handlePageChange = (pageNumber) => {
    window.scrollTo(0, 0);
    setQuery((query) => ({
      ...query,
      currentPage: pageNumber,
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        handleView(POST_VIEW.LIST);
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <>
      <AlertSnackbar
        show={isSuccess}
        message='Post has been deleted successfully'
      />
      <div className='flex justify-between m-8'>
        <h1 className='text-2xl font-bold text-center mb-6'>Posts</h1>
        <button
          onClick={() => handleView(POST_VIEW.ADD)}
          className='bg-blue-500 text-white py-1 px-8 rounded hover:bg-blue-600'
        >
          Add Post
        </button>
      </div>
      <div className='grid grid-cols-1 gap-6'>
        {posts?.map((post) => (
          <div
            key={post.id}
            className='p-4 bg-white border border-gray-300 shadow-lg rounded-lg hover:shadow-xl transition-shadow'
          >
            <h2 className='text-xl font-semibold text-gray-800'>
              {post.id}:-{post.title}
            </h2>
            <p className='text-gray-600 mt-2'>{post.body}</p>
            <div className='flex justify-between mt-4'>
              <button
                onClick={() => handleView(POST_VIEW.VIEW, post.id)}
                className='bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600'
              >
                View
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className='bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className='flex items-center justify-center space-x-4 mt-4'>
        <button
          onClick={() => handlePageChange(currentPage - NUMBERS.ONE)}
          disabled={currentPage === 1}
          className='px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50'
        >
          Prev
        </button>
        <span className='text-gray-700'>
          Page {currentPage} of {100}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + NUMBERS.ONE)}
          disabled={currentPage === NUMBERS.TEN}
          className='px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ListPosts;

ListPosts.propTypes = {
  handleView: func.isRequired,
};
