"use client";

import { useRouter } from "next/navigation";
import { useUserSearchParams } from "./search-params";

export function SearchInput() {
  const { setUserSearchParams } = useUserSearchParams();

  const router = useRouter();

  return (
    <div className="my-4">
      <input
        type="search"
        className="border border-gray-300 rounded-md p-2 w-full"
        placeholder="Search..."
        onChange={(event) => {
          //   router.push(`/?name=${event.target.value}`);
          setUserSearchParams((prev) => ({
            ...prev,
            name: event.target.value,
          }));

          router.refresh();
        }}
      />
    </div>
  );
}
