// src/components/Delete.jsx

'use client';

import Image from 'next/image';
import delImage from './del.png';

export default function Delete({ postId, handleDelete }) {
  return (
    <button onClick={() => handleDelete(postId)} className="focus:outline-none">
      <Image src={delImage} alt="Delete" width={20} height={20} />
    </button>
  );
}
