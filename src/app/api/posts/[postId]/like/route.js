// src/app/api/posts/[postId]/like/route.js
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  const postId = params.postId;

  try {
    const userId = 1;

    await sql`
      INSERT INTO likes (post_id, user_id)
      VALUES (${postId}, ${userId})
    `;

    const result = await sql`
      SELECT COUNT(*) AS like_count
      FROM likes
      WHERE post_id = ${postId}
    `;

    const updatedLikes = result.rows[0].like_count;

    return NextResponse.json(updatedLikes);
  } catch (error) {
    console.error('Error updating likes:', error);
    return NextResponse.json(
      { error: 'Failed to update likes' },
      { status: 500 }
    );
  }
}
