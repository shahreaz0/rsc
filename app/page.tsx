import { getUserList } from "@/apis/users";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { loadUserSearchParams } from "./search-params";

type ServerProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: ServerProps) {
  const { name, page } = await loadUserSearchParams(searchParams);

  const users = await getUserList({ _page: page, name });

  return (
    <main className="m-5 p-5">
      <h1>Users</h1>

      <SearchInput />

      <div className="overflow-y-auto h-[calc(100vh-40px)]">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border">ID</th>
              <th className="border">Name</th>
              <th className="border">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map((user) => (
              <tr key={user.id}>
                <td className="border">{user.id}</td>
                <td className="border">{user.name}</td>
                <td className="border">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="space-x-2">
          <Link
            href={`/?page=${users.pages < page ? users.pages - 1 : page - 1}`}
            style={{
              pointerEvents: !users.prev ? "none" : "auto",
              opacity: !users.prev ? 0.5 : 1,
            }}
          >
            Prev
          </Link>
          <Link
            href={`/?page=${page + 1}`}
            style={{
              pointerEvents: !users.next ? "none" : "auto",
              opacity: !users.next ? 0.5 : 1,
            }}
          >
            Next
          </Link>
        </div>
      </div>
    </main>
  );
}
