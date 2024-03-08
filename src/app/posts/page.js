// src/app/posts/page.js

import { sql } from '@vercel/postgres';
import { currentUser } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import Delete from '@/components/Delete';
import Comments from '@/components/Comments';
import Like from '@/components/Like';

export default async function Page({ params }) {
  const user = await currentUser();
  const result = await sql`
    SELECT
      posts.id,
      posts.username,
      posts.post,
      posts.created_at,
      COALESCE(likes.like_count, 0) AS likes
    FROM
      guestbook AS posts
    LEFT JOIN
      (
        SELECT
          post_id,
          COUNT(*) AS like_count
        FROM
          likes
        GROUP BY
          post_id
      ) AS likes ON posts.id = likes.post_id
    ORDER BY
      posts.created_at DESC
  `;
  const posts = result.rows;

  async function handleDelete(postId) {
    'use server';

    await sql`DELETE FROM guestbook WHERE id = ${postId} AND username = ${user?.firstName}`;
    revalidatePath('/posts');
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <a href="/posts/new" className="hover-bold bg-[#387ADF] rounded-md p-2">
          Add New Post
        </a>
      </div>
      <div className="mt-4 w-full max-w-3xl">
        {Array.isArray(posts) &&
          posts.map((post) => (
            <div key={post.id} className="border rounded p-2 mb-2">
              <p className="font-bold text-[#387ADF]">{post.username}</p>
              <p>{post.post}</p>
              <p className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleString()}
              </p>
              <div className="pt-1">
                <div className="flex space-x-8">
                  <div className="flex items-center">
                    <Like postId={post.id} initialLikes={post.likes} />
                  </div>
                  <div className="flex items-center">
                    <Comments postId={post.id} />
                  </div>
                  {user?.firstName === post.username && (
                    <Delete postId={post.id} handleDelete={handleDelete} />
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
