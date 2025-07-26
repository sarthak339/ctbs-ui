import React from 'react';
import styles from './style.module.css';

const Loader = () => {
  return (
    <div className="flex items-center justify-center absolute top-1/3">
      <div className="w-16 h-16 border-4 border-t-transparent border-gray-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
