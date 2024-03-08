// src/app/posts/NewPostForm.jsx

'use client';

import { useState } from 'react';
import { handlePost } from './actions';

export default function NewPostForm() {
  const [postText, setPostText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [postError, setPostError] = useState('');

  function handleCharCount(event) {
    const text = event.target.value;
    setPostText(text);
    setCharCount(text.length);
  }

  async function onSubmit(event) {
    event.preventDefault();
    const postContent = postText.trim();

    if (postContent === '') {
      setPostError('Please enter a post');
      return;
    }

    const formData = new FormData();
    formData.append('post', postContent);

    await handlePost(formData);
    setPostText('');
    setCharCount(0);
    setPostError('');
  }

  return (
    <form className="flex flex-col gap-2 w-full" onSubmit={onSubmit}>
      <div className="relative">
        <textarea
          name="post"
          id="post"
          rows="4"
          maxLength="160"
          placeholder="write your post here"
          value={postText}
          onChange={handleCharCount}
          className="border rounded p-2 bg-transparent text-white w-full resize-none"
        ></textarea>
        <div className="absolute bottom-2 right-2 text-sm text-gray-500">
          {charCount}/160
        </div>
      </div>
      {postError && <p className="text-red-500">{postError}</p>}{' '}
      {/* Display error message if post is empty */}
      <button
        type="submit"
        className="bg-[#387ADF] text-white rounded-md px-4 py-2"
      >
        Add post
      </button>
    </form>
  );
}
