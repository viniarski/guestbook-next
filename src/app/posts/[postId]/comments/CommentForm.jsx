// src/app/posts/[postId]/comments/CommentForm.jsx
'use client';

import { useState } from 'react';
import { handleComment } from './actions';

export default function CommentForm({ postId }) {
  const [commentText, setCommentText] = useState('');
  const [charCount, setCharCount] = useState(0);

  function handleCharCount(event) {
    const text = event.target.value;
    setCommentText(text);
    setCharCount(text.length);
  }

  async function onSubmit(event) {
    event.preventDefault();
    await handleComment({ comment: commentText, postId });
    setCommentText('');
    setCharCount(0);
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <label htmlFor="comment">Add a comment:</label>
      <div className="relative">
        <textarea
          name="comment"
          id="comment"
          value={commentText}
          onChange={handleCharCount}
          className="border rounded p-2 text-[#387ADF] w-full resize-none"
          rows={4}
          maxLength={160}
        ></textarea>
        <div className="absolute bottom-2 right-2 text-sm text-gray-500">
          {charCount}/160
        </div>
      </div>
      <button
        type="submit"
        className="bg-[#387ADF] text-white rounded-md px-4 py-2"
      >
        Submit
      </button>
    </form>
  );
}
