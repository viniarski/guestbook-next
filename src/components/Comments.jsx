// src/components/Comments.jsx
'use client';
import Link from 'next/link';

export default function Comments({ postId }) {
  return (
    <Link href={`/posts/${postId}/comments`}>
      <button className="bg-blue-500 text-white rounded-md px-2 py-1 text-xs">
        Comments
      </button>
    </Link>
  );
}
