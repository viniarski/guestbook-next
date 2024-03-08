// src/app/posts/NewPostForm.jsx

'use client';

import { useState } from 'react';
import { handlePost } from './actions';

export default function NewPostForm() {
  const [postText, setPostText] = useState('');
  const [charCount, setCharCount] = useState(0);

  function handleCharCount(event) {
    const text = event.target.value;
    setPostText(text);
    setCharCount(text.length);
  }

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const postContent = formData.get('post').trim();

    if (postContent === '') {
      return;
    }

    await handlePost(formData);
    setPostText('');
    setCharCount(0);
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
      <button
        type="submit"
        className="bg-[#387ADF] text-white rounded-md px-4 py-2"
      >
        Add post
      </button>
    </form>
  );
}
