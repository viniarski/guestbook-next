// src/app/page.js

import Image from 'next/image';
import myImage from '@/components/guestbook_logo.png';

export default function Home() {
  return (
    <main className="flex justify-center items-center">
      <div className="text-center">
        <Image src={myImage} alt="Guestbook Logo" width={600} height={600} />
      </div>
    </main>
  );
}
