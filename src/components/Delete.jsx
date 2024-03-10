// src/components/Delete.jsx
'use client';

import { handleDelete } from './actions';
import Image from 'next/image';
import delImage from './del.png';

export default function Delete({ postId }) {
  return (
    <button
      onClick={() => handleDelete(postId)}
      className="focus:outline-none relative group"
    >
      <div className="relative">
        <Image src={delImage} alt="Delete" width={18} height={18} />
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 transition-opacity duration-200 group-hover:opacity-100 mt-2 pointer-events-none">
          Delete
        </span>
      </div>
    </button>
  );
}
