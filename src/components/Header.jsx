import Link from 'next/link';
import { SignInButton } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs';

export default function Header() {
  const { userId } = auth();
  return (
    <div className="flex justify-center">
      <div className="p-4 pt-14">
        <div className="w-full items-center justify-between font-mono text-sm lg:flex">
          <h1 className="text-4xl text-white font-bold">MOSAIC MEMORIES</h1>
        </div>
        <ol className="flex flex-row p-3 items-center justify-center">
          <li className="m-4">
            <Link
              href="/"
              className="hover:underline"
              style={{ color: '#387ADF' }}
            >
              Home
            </Link>
          </li>
          <li className="m-4">
            <Link
              href="/posts"
              className="hover:underline"
              style={{ color: '#387ADF' }}
            >
              Posts
            </Link>
          </li>
          <li className="m-4">{userId ? <UserButton /> : <SignInButton />}</li>
        </ol>
      </div>
    </div>
  );
}
