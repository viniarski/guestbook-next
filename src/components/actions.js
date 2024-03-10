// src/components/actions.js

'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@clerk/nextjs';

export async function handleDelete(postId) {
  const user = await currentUser();

  await sql`DELETE FROM likes WHERE post_id = ${postId}`;
  await sql`DELETE FROM comments WHERE post_id = ${postId}`;
  await sql`DELETE FROM guestbook WHERE id = ${postId} AND username = ${user?.firstName}`;

  revalidatePath('/posts');
}
