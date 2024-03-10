// src/app/user/[userId]/page.js
import { currentUser } from '@clerk/nextjs';
import ProfileForm from './profileForm';

export default async function UserProfilePage({ params }) {
  const { userId } = params;
  const user = await currentUser();

  if (!user || user.id !== userId) {
    return <div>User not found</div>;
  }

  const primaryEmailAddress = user.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="bg-black bg-opacity-50 rounded-lg p-8 mb-8">
          <h1 className="text-4xl text-white font-bold mb-4">User Profile</h1>
          <div className="mb-4">
            <p className="text-gray-400">Name:</p>
            <p className="text-white">{user.fullName}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-400">Email:</p>
            <p className="text-white">{primaryEmailAddress}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-400">Bio:</p>
            <p className="text-white">{user.bio}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-400">Location:</p>
            <p className="text-white">{user.location}</p>
          </div>
        </div>

        <div className="bg-black bg-opacity-50 rounded-lg p-8">
          <h2 className="text-2xl text-white font-bold mb-4">Edit Profile</h2>
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}
