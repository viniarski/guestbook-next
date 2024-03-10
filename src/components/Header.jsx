// src/components/Header.jsx

import Link from 'next/link';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs';
import homeImage from './home.png';
import postsImage from './posts.png';
import profileImage from './profile.png';

export default function Header() {
  const { userId } = auth();

  return (
    <div className="flex justify-center">
      <div className="p-4 pt-14">
        <div className="w-full items-center justify-between font-mono text-sm lg:flex">
          <h1 className="text-4xl text-white text-center font-bold">
            MOSAIC MEMORIES
          </h1>
        </div>
        <ol className="flex flex-row p-3 items-center justify-center">
          <li className="m-4">
            <Link href="/" className="flex items-center hover:scale-110">
              <Image
                src={homeImage}
                alt="Home"
                width={22}
                height={22}
                className="mr-1"
              />
              <span style={{ color: '#387ADF' }}>Home</span>
            </Link>
          </li>
          <li className="m-4">
            <Link href="/posts" className="flex items-center hover:scale-110">
              <Image
                src={postsImage}
                alt="Posts"
                width={16}
                height={16}
                className="mr-1"
              />
              <span style={{ color: '#387ADF' }}>Posts</span>
            </Link>
          </li>
          {userId && (
            <li className="m-4">
              <Link
                href={`/user/${userId}`}
                className="flex items-center hover:scale-110"
              >
                <Image
                  src={profileImage}
                  alt="Profile"
                  width={14}
                  height={14}
                  className="mr-1"
                />
                <span style={{ color: '#387ADF' }}>Profile</span>
              </Link>
            </li>
          )}
          <li className="m-4">
            {userId ? (
              <UserButton />
            ) : (
              <Link href="/sign-in" className="text-white hover:scale-110">
                Sign In
              </Link>
            )}
          </li>
        </ol>
      </div>
    </div>
  );
}
