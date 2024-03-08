// src/app/page.js

import Image from 'next/image';
import myImage from '@/components/guestbook_logo.png';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center">
      <div className="text-center">
        <Image src={myImage} alt="Guestbook Logo" width={600} height={600} />
      </div>
      <div className="flex justify-center">
        <p className="max-w-5xl w-full font-mono text-white text-justify max-w-prose">
          Welcome to our guestbook! Here, users can share their thoughts,
          greetings, and messages with others in our community. Whether it's a
          heartfelt message, a helpful tip, or simply saying hello, our
          guestbook provides a platform for users to connect and interact. Feel
          free to post your own messages and read through the posts shared by
          other users. Join us in spreading positivity, support through our
          guestbook. Start sharing your voice today!
        </p>
      </div>
    </main>
  );
}
