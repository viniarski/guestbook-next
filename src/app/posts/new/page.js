// src/app/posts/new/page.js

import { sql } from '@vercel/postgres';
import Submit from '@/components/Submit';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@clerk/nextjs';

export default async function page() {
  const user = await currentUser();

  async function handlePost(formData) {
    'use server';

    console.log(formData);
    const post = formData.get('post');

    await sql`INSERT INTO guestbook (username, post) VALUES (${
      user?.firstName || 'Anonymous'
    }, ${post})`;

    revalidatePath('/posts');

    redirect('/posts');
  }

  return (
    <main className="flex flex-col items-center mt-1">
      <h1 className="text-3xl font-bold">New post</h1>
      <form className="flex flex-col gap-1" action={handlePost}>
        <div className="flex flex-col gap-1 items-center justify-center">
          <label htmlFor="post">Message: </label>
          <input
            type="text"
            name="post"
            id="post"
            className="bg-white border-zinc-400 border-[2px] rounded-lg p-1 text-center text-[#00ADB5]"
          />
        </div>
        <Submit />
      </form>
    </main>
  );
}
