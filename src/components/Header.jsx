import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex justify-center">
      <div className="p-4 pt-24">
        <div className="w-full items-center justify-between font-mono text-sm lg:flex">
          <h1 className="text-4xl font-bold">NEXT GUESTBOOK</h1>
        </div>
        <ol className="flex flex-row p-3 items-center justify-center">
          <li className="m-4">
            <Link href="/" style={{ color: '#00ADB5' }}>
              Home
            </Link>
          </li>
          <li className="m-4">
            <Link href="/posts" style={{ color: '#00ADB5' }}>
              Posts
            </Link>
          </li>
          <li className="m-4">
            <Link href="/about" style={{ color: '#00ADB5' }}>
              About
            </Link>
          </li>
        </ol>
      </div>
    </div>
  );
}
