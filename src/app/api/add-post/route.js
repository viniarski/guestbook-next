import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('Username');
  const post = searchParams.get('Post');

  try {
    if (!username || !post) throw new Error('Username and message required');
    await sql`INSERT INTO Guestbook (Username, Post) VALUES (${username}, ${post});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const guestbook = await sql`SELECT * FROM Guestbook;`;
  return NextResponse.json({ guestbook }, { status: 200 });
}
