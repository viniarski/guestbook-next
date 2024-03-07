// src/app/posts/page.js
import { sql } from '@vercel/postgres';
import { currentUser } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import Delete from '@/components/Delete';
import Comments from '@/components/Comments';

export default async function Page({ params }) {
  const user = await currentUser();
  const result = await sql`SELECT * FROM guestbook`;
  const posts = result.rows;

  async function handleDelete(postId) {
    'use server';

    await sql`DELETE FROM guestbook WHERE id = ${postId} AND username = ${user?.firstName}`;
    revalidatePath('/posts');
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-4 w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-2 pt-10">Recent Posts:</h2>
        {Array.isArray(posts) &&
          posts.map((post) => (
            <div key={post.id} className="border rounded p-2 mb-2">
              <p className="font-bold text-[#00ADB5]">{post.username}</p>
              <p>{post.post}</p>
              <div className="flex justify-end space-x-2">
                <Comments postId={post.id} />
                {user?.firstName === post.username && (
                  <Delete postId={post.id} handleDelete={handleDelete} />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
