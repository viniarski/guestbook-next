// src/app/api/update-profile/route.js

import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { userId, bio, location } = await request.json();

  try {
    await clerkClient.users.updateUser(userId, {
      bio,
      location,
    });
    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
