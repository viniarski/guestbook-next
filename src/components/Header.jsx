import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex justify-center">
      <div className="p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <h1 className="text-4xl font-bold">NEXT GUESTBOOK</h1>
        </div>
        <ol className="flex flex-row p-3 items-center justify-center">
          <li className="m-4">
            <Link href="/">Home</Link>
          </li>
          <li className="m-4">
            <Link href="/posts/1">Posts</Link>
          </li>
          <li className="m-4">
            <Link href="/about">About</Link>
          </li>
        </ol>
      </div>
    </div>
  );
}
