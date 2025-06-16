'use client';

import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md p-4 space-y-4 overflow-y-auto">
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
        + New Chat
      </button>
      <div className="space-y-2">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="p-3 bg-gray-100 rounded-lg hover:bg-blue-100 cursor-pointer"
          >
            Chat {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
