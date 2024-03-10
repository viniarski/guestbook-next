// src/app/posts/page.js

import { sql } from '@vercel/postgres';
import { currentUser } from '@clerk/nextjs';
import Delete from '@/components/Delete';
import Comments from '@/components/Comments';
import Like from '@/components/Like';
import NewPostForm from './NewPostForm';
import Link from 'next/link';

export default async function Page() {
  const user = await currentUser();

  const fetchCommentsCount = async (postId) => {
    const result = await sql`
      SELECT COUNT(*) AS comment_count FROM comments WHERE post_id = ${postId}
    `;
    return result.rows[0].comment_count;
  };

  const fetchPosts = async () => {
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

    const postsWithCommentsCount = await Promise.all(
      posts.map(async (post) => {
        post.comment_count = await fetchCommentsCount(post.id);
        return post;
      })
    );

    return postsWithCommentsCount;
  };

  const posts = await fetchPosts();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-4 w-full max-w-3xl">
        <NewPostForm />
      </div>
      <div className="mt-8 w-full max-w-3xl">
        {Array.isArray(posts) &&
          posts.map((post) => (
            <div key={post.id} className="border rounded p-2 mb-2">
              <div className="inline-block">
                <Link href={`/user/${encodeURIComponent(post.username)}`}>
                  <p className="font-bold text-[#387ADF] hover:underline cursor-pointer">
                    {post.username}
                  </p>
                </Link>
              </div>
              <p>{post.post}</p>
              <p className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleString()}
              </p>
              <div className="pt-1">
                <div className="flex space-x-8">
                  <Like postId={post.id} initialLikes={post.likes} />
                  <Comments
                    postId={post.id}
                    commentCount={post.comment_count}
                  />
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
