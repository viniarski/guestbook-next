import Link from 'next/link';
import { SignInButton } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs';

export default function Header() {
  const { userId } = auth();
  return (
    <div className="flex justify-center">
      <div className="p-4 pt-24">
        <div className="w-full items-center justify-between font-mono text-sm lg:flex">
          <h1 className="text-4xl font-bold">NEXT GUESTBOOK</h1>
        </div>
        <ol className="flex flex-row p-3 items-center justify-center">
          <li className="m-4">
            <Link
              href="/"
              className="hover:underline"
              style={{ color: '#00ADB5' }}
            >
              Home
            </Link>
          </li>
          <li className="m-4">
            <Link
              href="/posts"
              className="hover:underline"
              style={{ color: '#00ADB5' }}
            >
              Posts
            </Link>
          </li>
          <li className="m-4">
            <Link
              href="/about"
              className="hover:underline"
              style={{ color: '#00ADB5' }}
            >
              About
            </Link>
          </li>
          <li className="m-4">{userId ? <UserButton /> : <SignInButton />}</li>
        </ol>
      </div>
    </div>
  );
}
