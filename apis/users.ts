export type UserResponse = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: User[];
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
};

export async function getUserList({ page = 1, per_page = 10, name = "" } = {}) {
  const params = new URLSearchParams({
    _page: page.toString(),
    _per_page: per_page.toString(),
    name,
  }).toString();

  //

  const res = await fetch(`http://localhost:8787/users?${params}`, {
    // cache: "force-cache",
    // next: {
    //   revalidate: 5,
    // },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: UserResponse = await res.json();
  return data;
}
