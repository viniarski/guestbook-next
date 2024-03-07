// src/app/posts/new/page.js

'use client';

import { useState } from 'react';
import Submit from '@/components/Submit';
import { handlePost } from './actions';

export default function Page() {
  const [charCount, setCharCount] = useState(0);

  function handleCharCount(event) {
    setCharCount(event.target.value.length);
  }

  return (
    <main className="flex flex-col items-center mt-1">
      <h1 className="text-3xl font-bold pb-5">New post</h1>
      <form className="flex flex-col gap-1" action={handlePost}>
        <div className="flex flex-col gap-1 items-center justify-center">
          <textarea
            name="post"
            id="post"
            rows="4"
            maxLength="160"
            placeholder="write your post here"
            className="bg-white border-zinc-400 border-[2px] rounded-lg p-1 text-center text-[#387ADF] resize-none"
            onChange={handleCharCount}
          ></textarea>
          <div className="text-sm text-gray-500">{charCount}/160</div>
        </div>
        <Submit />
      </form>
    </main>
  );
}
