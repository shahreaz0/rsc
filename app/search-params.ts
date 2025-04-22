import { useQueryStates } from "nuqs";
import { parseAsFloat, parseAsString, createSearchParamsCache } from "nuqs/server";

export const _userSearchParams = {
  page: parseAsFloat.withDefault(1),
  perPage: parseAsFloat.withDefault(10),
  name: parseAsString.withDefault(""),
};

// export const loadUserSearchParams = createLoader(_userSearchParams);

export const userSearchParamsCache = createSearchParamsCache(_userSearchParams);

export function useUserSearchParams() {
  const [userSearchParams, setUserSearchParams] = useQueryStates(_userSearchParams, {
    shallow: false,
  });

  return {
    userSearchParams,
    setUserSearchParams,
  };
}
