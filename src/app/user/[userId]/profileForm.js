// src/app/user/[userId]/profileForm.js

'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

export default function ProfileForm() {
  const { user } = useUser();
  const [bio, setBio] = useState(user.bio || '');
  const [location, setLocation] = useState(user.location || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await user.update({ bio, location });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Bio:
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <button type="submit">Update Profile</button>
    </form>
  );
}
