
// SearchBar.jsx

import React from 'react';

const SearchBar = ({ handleSearch }) => {
  return (
    <div className="m-4 p-2 bg-stone-900 rounded-lg">
      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full p-2 bg-stone-900 border-none focus:outline-none text-white"
      />
    </div>
  );
};

export default SearchBar;
