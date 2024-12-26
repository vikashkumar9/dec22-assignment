import { string } from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ className = '' }) => {
  const navigate = useNavigate('/');
  return (
    <button
      onClick={() => navigate('/')}
      className={`${className} border border-gray-500 text-gray-500 py-1 px-4 rounded hover:bg-gray-500 hover:text-white transition duration-300}`}
    >
      Back
    </button>
  );
};

export default BackButton;

BackButton.propTypes = {
  className: string.isRequired,
};
