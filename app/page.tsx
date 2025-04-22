import { getUserList, UserResponse } from "@/apis/users";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { userSearchParamsCache } from "./search-params";

type ServerProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: ServerProps) {
  const { name, page } = await userSearchParamsCache.parse(searchParams);

  const users = await getUserList({ page, name });

  const currentSearchParams = new URLSearchParams();

  if (page > 1) {
    currentSearchParams.set("page", page.toString());
  }

  if (name) {
    currentSearchParams.set("name", name);
  }

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
          <PreviousButton
            users={users}
            page={page}
            currentSearchParams={currentSearchParams}
          />

          <NextButton
            users={users}
            page={page}
            currentSearchParams={currentSearchParams}
          />
        </div>
      </div>
    </main>
  );
}

export function NextButton({
  currentSearchParams,
  users,
}: {
  currentSearchParams: URLSearchParams;
  users: UserResponse;
  page: number;
}) {
  const newSearchParams = new URLSearchParams(currentSearchParams);

  if (users.next) {
    newSearchParams.set("page", users.next.toString());
  } else {
    newSearchParams.delete("page");
  }

  return (
    <Link
      href={`/?${newSearchParams.toString()}`}
      style={{
        pointerEvents: !users.next ? "none" : "auto",
        opacity: !users.next ? 0.5 : 1,
      }}
    >
      Next
    </Link>
  );
}

export function PreviousButton({
  currentSearchParams,
  users,
}: {
  currentSearchParams: URLSearchParams;
  users: UserResponse;
  page: number;
}) {
  const newSearchParams = new URLSearchParams(currentSearchParams);

  if (users.prev) {
    newSearchParams.set("page", users.prev.toString());
  } else {
    newSearchParams.delete("page");
  }

  return (
    <Link
      href={`/?${newSearchParams.toString()}`}
      style={{
        pointerEvents: !users.prev ? "none" : "auto",
        opacity: !users.prev ? 0.5 : 1,
      }}
    >
      Prev
    </Link>
  );
}
