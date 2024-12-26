import React from 'react';

const Spinner = ({ size = 'w-12 h-12', color = 'border-blue-500' }) => {
  return (
    <div className={`flex items-center justify-center`}>
      <div
        className={`${size} border-4 ${color} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Spinner;
