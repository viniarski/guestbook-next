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
          Welcome to <span className="text-[#387ADF]">Mosaic Memories</span>!
          Here, users can create lasting impressions by sharing their thoughts,
          greetings, and messages with others in our vibrant community. Whether
          it's a heartfelt message, a helpful tip, or simply saying hello,
          Mosaic Memories provides a platform for users to connect and interact.
          Feel free to share your own messages and explore the diverse array of
          posts contributed by fellow users. Let's come together to create
          beautiful memories and spread positivity and support through Mosaic
          Memories. Start sharing your voice and building memories today!
        </p>
      </div>
    </main>
  );
}
