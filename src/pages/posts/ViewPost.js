import { func, number } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { POST_VIEW } from './utils';
import axios from 'axios';
import { API_URL } from './usePosts';

const ViewPost = ({ postId, handleView }) => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/${id ? id : ''}`);
      setPost(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch post.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost(postId);
  }, [postId]);

  return (
    <>
      <div
        key={post.id}
        className='p-4 bg-white border border-gray-300 shadow-lg rounded-lg hover:shadow-xl transition-shadow '
      >
        <h2 className='text-xl font-semibold text-gray-800'>{post.title}</h2>
        <p className='text-gray-600 mt-2'>{post.body}</p>
      </div>
      <div className='max-w-md mx-auto flex justify-between m-8'>
        <button
          onClick={() => handleView(POST_VIEW.LIST)}
          className='w-full border border-gray-500 text-gray-500 py-1 px-4 rounded hover:bg-gray-500 hover:text-white transition duration-300'
        >
          Back
        </button>
      </div>
    </>
  );
};

export default ViewPost;

ViewPost.propTypes = {
  postId: number.isRequired,
  handleView: func.isRequired,
};
