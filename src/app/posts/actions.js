// src/app/posts/actions.js

'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function handleDelete(postId, user) {
  await sql`DELETE FROM guestbook WHERE id = ${postId} AND username = ${user?.firstName}`;
  revalidatePath('/posts');
}
