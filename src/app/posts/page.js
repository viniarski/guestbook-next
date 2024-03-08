// src/app/posts/page.js
import { sql } from '@vercel/postgres';
import { currentUser } from '@clerk/nextjs';
import Delete from '@/components/Delete';
import Comments from '@/components/Comments';
import Like from '@/components/Like';
import { handlePost } from './actions';

export default async function Page() {
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

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-4 w-full max-w-3xl">
        <h1 className="text-xl font-bold pb-5">New post</h1>
        <form className="flex flex-col gap-2 w-full" action={handlePost}>
          <div className="relative">
            <textarea
              name="post"
              id="post"
              rows="4"
              maxLength="160"
              placeholder="write your post here"
              className="border rounded p-2 bg-transparent text-white w-full resize-none"
            ></textarea>
            <div className="absolute bottom-2 right-2 text-sm text-gray-500">
              0/160
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#387ADF] text-white rounded-md px-4 py-2"
          >
            Add post
          </button>
        </form>
      </div>
      <div className="mt-8 w-full max-w-3xl">
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
                    <Delete postId={post.id} />
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
