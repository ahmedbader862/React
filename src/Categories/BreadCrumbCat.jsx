import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ categoryId, categoryName }) => {
  const curentLange = useSelector((state) => state.lange.lange);

  const text = useSelector((state) => state.lange[curentLange]);
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <Link to="/" className="hover:text-gray-800">{text.home}</Link>
      <span>/</span>
      <Link to="/categories" className="hover:text-gray-800">{text.Categories}</Link>
      <span>/</span>
      <span className="hover:text-gray-800">{categoryName}</span>
    </div>
  );
};

export default Breadcrumb;

