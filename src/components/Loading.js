import React from 'react';

function Loading() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      <span className="ml-3 text-xl font-semibold text-gray-700">Loading...</span>
    </div>
  );
}

export default Loading;