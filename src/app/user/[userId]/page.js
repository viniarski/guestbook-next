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
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.fullName}</p>
      <p>Email: {primaryEmailAddress}</p>
      <p>Bio: {user.bio}</p>
      <p>Location: {user.location}</p>
      <ProfileForm />
    </div>
  );
}
