import React, { useEffect, useState } from 'react';
import { POST_VIEW } from './utils';
import { func } from 'prop-types';
import { useAddPostMutation } from '../servies/post';

import AlertSnackbar from './AlertSnackBar';

const AddPosts = ({ handleView }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert('Both Title and Description are required!');
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      body: description,
    };

    addPost(newPost);
    setTitle('');
    setDescription('');
  };

  const [addPost, { isLoading, isError, isSuccess }] = useAddPostMutation();

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
        message='Post has been added successfully'
      />
      <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-300'>
        <h1 className='text-2xl font-bold text-center mb-6'>Add New Post</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='title'
              className='block text-gray-700 font-medium mb-2'
            >
              Title
            </label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter post title'
            />
          </div>
          <div>
            <label
              htmlFor='description'
              className='block text-gray-700 font-medium mb-2'
            >
              Description
            </label>
            <textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              rows='4'
              placeholder='Enter post description'
            ></textarea>
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300'
          >
            Add Post
          </button>
        </form>
      </div>
      <div className='max-w-md mx-auto flex justify-between m-8'>
        <button
          onClick={() => handleView(POST_VIEW.LIST)}
          className='w-full border border-gray-500 text-gray-500 py-1 px-4 rounded hover:bg-gray-500 hover:text-white transition duration-300'
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default AddPosts;

AddPosts.propTypes = {
  handleView: func.isRequired,
};
