// src/app/posts/[postId]/comments/page.js
import { sql } from '@vercel/postgres';
import CommentForm from './CommentForm';

export default async function CommentsPage({ params }) {
  const { postId } = params;

  const fetchComments = async () => {
    const commentsResult =
      await sql`SELECT * FROM comments WHERE post_id = ${postId}`;
    return commentsResult.rows;
  };

  const fetchPost = async () => {
    const postResult = await sql`SELECT * FROM guestbook WHERE id = ${postId}`;
    return postResult.rows[0];
  };

  const [comments, post] = await Promise.all([fetchComments(), fetchPost()]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-4 w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-2">Post:</h2>
        <div className="border rounded p-2 mb-4">
          <p className="font-bold text-[#387ADF]">{post.username}</p>
          <p>{post.post}</p>
        </div>

        <h2 className="text-xl font-bold mb-2">Comments:</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="border rounded p-2 mb-2">
            <p className="font-bold text-[#387ADF]">{comment.username}</p>
            <p>{comment.comment}</p>
          </div>
        ))}

        <CommentForm postId={postId} />
      </div>
    </div>
  );
}
