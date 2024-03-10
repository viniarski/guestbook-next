// src/components/Comments.jsx

import Link from 'next/link';
import Image from 'next/image';
import commentImage from './comment.png';

export default function Comments({ postId, commentCount }) {
  return (
    <div className="relative group">
      <Link href={`/posts/${postId}/comments`} className="flex items-center">
        <Image src={commentImage} alt="Comments" width={20} height={20} />
        <span className="ml-1">{commentCount}</span>
      </Link>
      <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 transition-opacity duration-200 group-hover:opacity-100 mt-2 pointer-events-none">
        Comments
      </span>
    </div>
  );
}
