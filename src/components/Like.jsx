// src/components/Delete.jsx
'use client';

export default function Delete({ postId, handleDelete }) {
  return (
    <button
      onClick={() => handleLike(postId)}
      className="bg-blue-500 text-white rounded-md px-2 py-1 text-xs"
    >
      Delete
    </button>
  );
}
