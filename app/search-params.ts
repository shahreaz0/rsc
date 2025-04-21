import { useQueryStates } from "nuqs";
import { parseAsFloat, createLoader, parseAsString } from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const _userSearchParams = {
  page: parseAsFloat.withDefault(1),
  perPage: parseAsFloat.withDefault(10),
  name: parseAsString.withDefault(""),
};

export const loadUserSearchParams = createLoader(_userSearchParams);

export function useUserSearchParams() {
  const [userSearchParams, setUserSearchParams] = useQueryStates(_userSearchParams, {
    // history: "push",
    shallow: false,
  });

  return {
    userSearchParams,
    setUserSearchParams,
  };
}
