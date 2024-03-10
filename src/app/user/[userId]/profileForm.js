// src/app/user/[userId]/profileForm.js

'use client';

import { useState, useEffect } from 'react';
import { sql } from '@vercel/postgres';

export default function ProfileForm({ userId }) {
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await sql`
          SELECT * FROM users WHERE id = ${userId}
        `;
        const userData = result.rows[0];
        setBio(userData.bio || '');
        setLocation(userData.location || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sql`
        UPDATE users
        SET bio = ${bio}, location = ${location}
        WHERE id = ${userId}
      `;
    } catch (error) {
      console.error('Error updating profile:', error);
    }
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
