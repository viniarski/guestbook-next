// src/app/posts/[postId]/comments/page.js
import { sql } from '@vercel/postgres';
import { currentUser } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

export default async function CommentsPage({ params }) {
  const { postId } = params;
  const user = await currentUser();

  async function handleComment(formData) {
    'use server';
    const comment = formData.get('comment');

    await sql`INSERT INTO comments (post_id, username, comment) VALUES (${postId}, ${
      user?.firstName || 'Anonymous'
    }, ${comment})`;

    revalidatePath(`/posts/${postId}/comments`);
  }

  let commentsResult =
    await sql`SELECT * FROM comments WHERE post_id = ${postId}`;
  let comments = commentsResult.rows;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-4 w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-2">Comments:</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="border rounded p-2 mb-2">
            <p className="font-bold text-[#387ADF]">{comment.username}</p>
            <p>{comment.comment}</p>
          </div>
        ))}

        <form className="flex flex-col gap-2" action={handleComment}>
          <label htmlFor="comment">Add a comment:</label>
          <textarea
            name="comment"
            id="comment"
            className="border rounded p-2 text-[#387ADF]"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="bg-[#387ADF] text-white rounded-md px-4 py-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
