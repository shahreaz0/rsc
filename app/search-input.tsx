"use client";

import React from "react";
import { useUserSearchParams } from "./search-params";

export function SearchInput() {
  const { setUserSearchParams, isLoading, userSearchParams } = useUserSearchParams();

  const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null);

  const isSearchLoading = isLoading || timeoutId !== null;

  return (
    <div className="my-4">
      <input
        type="search"
        className="border border-gray-300 rounded-md p-2 w-full"
        placeholder="Search..."
        defaultValue={userSearchParams.name}
        onChange={(event) => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }

          const id = setTimeout(() => {
            setUserSearchParams((prev) => ({
              ...prev,
              name: event.target.value,
            }));

            setTimeoutId(null);
          }, 500);

          setTimeoutId(id);
        }}
      />

      {isSearchLoading && <div>Loading...</div>}
    </div>
  );
}
