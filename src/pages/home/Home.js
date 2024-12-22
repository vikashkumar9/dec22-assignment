import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-300'>
      <div className='max-w-md mx-auto flex justify-between m-8'>
        <button
          onClick={() => navigate('/login')}
          className='w-full border border-gray-500 text-gray-500 py-1 px-4 rounded hover:bg-gray-500 hover:text-white transition duration-300'
        >
          LOGIN
        </button>
      </div>
      <div className='max-w-md mx-auto flex justify-between m-8'>
        <Link to='/post' />
        <button
          onClick={() => navigate('/posts')}
          className='w-full border border-gray-500 text-gray-500 py-1 px-4 rounded hover:bg-gray-500 hover:text-white transition duration-300'
        >
          POST
        </button>
      </div>

      <div className='max-w-md mx-auto flex justify-between m-8'>
        <button
          onClick={() => navigate('/cart')}
          className='w-full border border-gray-500 text-gray-500 py-1 px-4 rounded hover:bg-gray-500 hover:text-white transition duration-300'
        >
          CART
        </button>
      </div>
    </div>
  );
};

export default Home;
