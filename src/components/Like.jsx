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
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="focus:outline-none flex items-center"
    >
      <Image src={likeImage} alt="Like" width={20} height={20} />
      <span className="ml-1">{likes}</span>
    </button>
  );
}
