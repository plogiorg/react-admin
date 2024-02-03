import { useQuery } from "react-query";
import { fetchUtil } from "../utils/fetch.util";

const QUERY_KEYS = {
  GET_CURRENT_USER: ["user"],
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_CURRENT_USER,
    queryFn: () => {
      return fetchUtil({
        url: "/v1/auth/me",
        method: "GET",
        token: true,
      });
    },
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_CURRENT_USER,
    queryFn: () => {
      return fetchUtil({
        url: "/v1/auth/users",
        method: "GET",
        token: true,
      });
    },
  });
};