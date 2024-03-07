// src/components/Delete.jsx
'use client';

export default function Delete({ postId, handleDelete }) {
  return (
    <button
      onClick={() => handleDelete(postId)}
      className="bg-red-500 text-white rounded-md px-2 py-1 text-xs"
    >
      Delete
    </button>
  );
}
