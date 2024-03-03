import { sql } from '@vercel/postgres';
import Submit from '@/components/Submit';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function page() {
  async function handlePost(formData) {
    'use server';

    console.log(formData);
    const username = formData.get('Username');
    const post = formData.get('Post');

    await sql`INSERT INTO guestbook (Username, Post) VALUES (${username}, ${post})`;

    revalidatePath('/guestbook');

    redirect('/guestbook');
  }

  return (
    <main className="flex flex-col items-center mt-1">
      <h1 className="text-3xl font-bold">New Post</h1>
      <form className="flex flex-col gap-1" action={handlePost}>
        <div className="flex flex-col gap-1 items-center justify-center mt-2">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            className="bg-white border-zinc-400 border-[2px] rounded-lg p-1 text-center text-[#00ADB5]"
          />
        </div>
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
