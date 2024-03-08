// src/app/posts/new/page.js

'use client';

import { useState } from 'react';
import { handlePost } from './actions';

export default function Page() {
  const [charCount, setCharCount] = useState(0);
  const [postError, setPostError] = useState('');

  function handleCharCount(event) {
    setCharCount(event.target.value.length);
  }

  async function onSubmit(event) {
    event.preventDefault();
    const postContent = event.target.post.value.trim();

    if (postContent === '') {
      setPostError('Please enter a post');
      return;
    }

    const formData = new FormData(event.target);
    await handlePost(formData);
    event.target.reset();
    setCharCount(0);
    setPostError('');
  }

  return (
    <main className="flex flex-col items-center mt-1">
      <h1 className="text-xl font-bold pb-5">New post</h1>
      <form
        className="flex flex-col gap-2 w-full max-w-3xl"
        onSubmit={onSubmit}
      >
        <div className="relative">
          <textarea
            name="post"
            id="post"
            rows="4"
            maxLength="160"
            placeholder="write your post here"
            className="border rounded p-2 text-[#387ADF] w-full resize-none"
            onChange={handleCharCount}
          ></textarea>
          <div className="absolute bottom-2 right-2 text-sm text-gray-500">
            {charCount}/160
          </div>
        </div>
        {postError && <p className="text-red-500">{postError}</p>}
        <button
          type="submit"
          className="bg-[#387ADF] text-white rounded-md px-4 py-2"
        >
          Add post
        </button>
      </form>
    </main>
  );
}
