// src/app/posts/[postId]/comments/CommentForm.jsx

'use client';

import { useState } from 'react';
import { handleComment } from './actions';

export default function CommentForm({ postId }) {
  const [commentText, setCommentText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [commentError, setCommentError] = useState('');

  function handleCharCount(event) {
    const text = event.target.value;
    setCommentText(text);
    setCharCount(text.length);
  }

  async function onSubmit(event) {
    event.preventDefault();
    const commentContent = commentText.trim();

    if (commentContent === '') {
      setCommentError('Please enter a comment');
      return;
    }

    await handleComment({ comment: commentContent, postId });
    setCommentText('');
    setCharCount(0);
    setCommentError('');
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <div className="relative">
        <textarea
          name="comment"
          id="comment"
          placeholder="write your comment here"
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
      {commentError && <p className="text-red-500">{commentError}</p>}
      <button
        type="submit"
        className="bg-[#387ADF] text-white rounded-md px-4 py-2"
      >
        Submit
      </button>
    </form>
  );
}
