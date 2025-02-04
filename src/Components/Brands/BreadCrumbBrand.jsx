import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ brandId, brandName }) => {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <Link to="/" className="hover:text-gray-800">Home</Link>
      <span>/</span>
      <Link to="/brands" className="hover:text-gray-800">Brands</Link>
      <span>/</span>
      <span className="hover:text-gray-800">{brandName}</span>
    </div>
  );
};

export default Breadcrumb;
