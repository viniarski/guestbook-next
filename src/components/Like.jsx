// src/components/Like.jsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import likeImage from './like.png';

export default function Like({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        const updatedLikes = await response.json();
        setLikes(updatedLikes);
      } else {
        console.error('Error updating likes:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={handleLike}
        className="focus:outline-none flex items-center"
      >
        <Image src={likeImage} alt="Like" width={16} height={16} />
        <span className="ml-1">{likes}</span>
      </button>
      <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 transition-opacity duration-200 group-hover:opacity-100 mt-2 pointer-events-none">
        Like
      </span>
    </div>
  );
}
