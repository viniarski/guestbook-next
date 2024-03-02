import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: 'Posts',
    description: `This page has a list of posts`,
  };
}

export default async function page({ params, searchParams }) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();

  if (searchParams.sort === 'desc') {
    posts.reverse();
  }

  return (
    <div>
      <div className="flex gap-3">
        <Link href={`/posts/${params.id}?sort=asc`}>Sort ascending</Link> -{' '}
        <Link href={`/posts/${params}?sort=desc`}>Sort descending</Link>
      </div>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <a href={`/posts/${params.id}/${post.id}`}>View Post</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
