// import { getCategories } from "@/server/APICalls";
// import { Category } from "@prisma/client";

export default async function Home() {
  // const categories: Category[] = await getCategories();

  return (
    <div>
      <h2>All Categories</h2>

      {/* <ul>
        {categories.map(cat => (
          <li key={cat.id}>{cat.category}</li>
        ))}
      </ul> */}
    </div>
  );
};
