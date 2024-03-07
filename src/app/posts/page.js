import { sql } from '@vercel/postgres';

export default async function Page({ params }) {
  const result = await sql`SELECT * FROM guestbook2`;

  const posts = result.rows;

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <a href="/posts/new" className="hover-bold bg-[#00ADB5] rounded-md p-2">
          Add New Post
        </a>
      </div>
      <div className="mt-4 w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-2 pt-10">Recent Posts:</h2>
        {Array.isArray(posts) &&
          posts.map((post) => (
            <div key={post.id} className="border rounded p-2 mb-2">
              <p className="font-bold text-[#00ADB5]">{post.username}</p>
              <p>{post.post}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
