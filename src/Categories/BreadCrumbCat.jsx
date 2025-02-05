import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ categoryId, categoryName }) => {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <Link to="/" className="hover:text-gray-800">Home</Link>
      <span>/</span>
      <Link to="/categories" className="hover:text-gray-800">Categories</Link>
      <span>/</span>
      <span className="hover:text-gray-800">{categoryName}</span>
    </div>
  );
};

export default Breadcrumb;

