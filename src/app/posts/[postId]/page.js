// src/app/posts/[postId]/page.js
import { sql } from '@vercel/postgres';

export default async function PostPage({ params }) {
  const { postId } = params;

  const postResult = await sql`SELECT * FROM guestbook WHERE id = ${postId}`;
  const post = postResult.rows[0];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-4 w-full max-w-3xl">
        <div className="border rounded p-2 mb-4">
          <p className="font-bold text-[#387ADF]">{post.username}</p>
          <p>{post.post}</p>
        </div>
      </div>
    </div>
  );
}
