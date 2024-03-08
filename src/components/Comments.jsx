// src/components/Comments.jsx

import Link from 'next/link';
import Image from 'next/image';
import commentImage from './comment.png';

export default function Comments({ postId }) {
  return (
    <Link href={`/posts/${postId}/comments`}>
      <Image src={commentImage} alt="Comments" width={20} height={20} />
    </Link>
  );
}
