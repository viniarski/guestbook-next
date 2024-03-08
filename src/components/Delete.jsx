// src/components/Delete.jsx
'use client';

import { handleDelete } from './actions';
import Image from 'next/image';
import delImage from './del.png';

export default function Delete({ postId }) {
  return (
    <button onClick={() => handleDelete(postId)} className="focus:outline-none">
      <Image src={delImage} alt="Delete" width={18} height={18} />
    </button>
  );
}
