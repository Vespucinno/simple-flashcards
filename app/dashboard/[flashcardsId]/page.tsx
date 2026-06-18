import { flashcards } from "@/data/flashcards";
import { globalDatabaseMock } from "@/lib/db";

interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
}
export default async function FlashDetail() {
  const response = await fetch("http://localhost:3000/api/getCards");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const posts: Post[] = await response.json();

  return (
    <main className="p-6">
      {posts.map((post) => (
        <h1 className="text-2xl font-bold mb-4" key={post.id}>
          {post.title}
        </h1>
      ))}
    </main>
  );
}
