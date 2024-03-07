// src/app/posts/[postId]/comments/actions.js
'use server';

import { sql } from '@vercel/postgres';
import { currentUser } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

export async function handleComment(formData, postId) {
  const comment = formData.get('comment');
  const user = await currentUser();

  await sql`INSERT INTO comments (post_id, username, comment) VALUES (${postId}, ${
    user?.firstName || 'Anonymous'
  }, ${comment})`;

  revalidatePath(`/posts/${postId}/comments`);
}
