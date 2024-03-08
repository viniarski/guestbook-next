// src/app/posts/actions.js

'use server';

import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@clerk/nextjs';

export async function handlePost(formData) {
  const post = formData.get('post');
  const currentTimestamp = new Date();

  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }

  await sql`INSERT INTO guestbook (username, post, created_at) VALUES (${
    user?.firstName || user?.lastName || 'Unknown'
  }, ${post}, ${currentTimestamp})`;

  revalidatePath('/posts');
  redirect('/posts');
}
