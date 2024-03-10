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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="bio" className="block text-gray-400 mb-1">
          Bio:
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          className="w-full bg-gray-800 text-white rounded-md p-2 resize-none"
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-gray-400 mb-1">
          Location:
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-gray-800 text-white rounded-md p-2"
        />
      </div>
      <button
        type="submit"
        className="bg-[#387ADF] text-white rounded-md px-4 py-2"
      >
        Update Profile
      </button>
    </form>
  );
}
