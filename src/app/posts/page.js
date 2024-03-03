import { sql } from '@vercel/postgres';

export default async function Page({ params }) {
  const result = await sql`SELECT * FROM guestbook2`;

  const posts = result.rows;

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <a href="/post" className="hover-bold">
          Add New Post
        </a>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Recent Posts:</h2>
        {Array.isArray(posts) &&
          posts.map((post) => (
            <div key={post.id} className="border rounded p-2 mb-2">
              <p className="font-bold">{post.username}</p>
              <p>{post.post}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
