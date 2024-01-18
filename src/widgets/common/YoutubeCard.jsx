// YouTubeCard.js

import React from 'react';

const YouTubeCard = () => {
  return (
    <div className="bg-white border border-gray-300 p-4 rounded-md shadow-md mb-4 flex">
      {/* Video Thumbnail (Left Side) */}
      <div className="flex-shrink-0 mr-4">
        <img
          src="https://via.placeholder.com/120x90" // Replace with your video thumbnail URL
          alt="Video Thumbnail"
          className="w-20 h-15 object-cover rounded-md"
        />
      </div>

      {/* Title and Description (Right Side) */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-1">Video Title Goes Here</h2>
        <p className="text-gray-600 text-sm">Video description goes here. This is a brief overview of what the video is about.</p>
        <div className="flex items-center mt-2">
          <span className="text-gray-500 text-sm">Author Name</span>
          <span className="mx-2 text-gray-500">•</span>
          <span className="text-gray-500 text-sm">1.5M views</span>
        </div>
      </div>
    </div>
  );
};

export default YouTubeCard;
