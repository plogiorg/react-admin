import { useQuery } from "react-query";
import { fetchUtil } from "../utils/fetch.util";
import { GetUsersResponse } from "./models.ts";

const QUERY_KEYS = {
  GET_CURRENT_USER: ["user"],
  GET_USERS: ["users"],
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
  return useQuery<GetUsersResponse>({
    queryKey: QUERY_KEYS.GET_USERS,
    queryFn: () => {
      return fetchUtil({
        url: "/v1/auth/users",
        method: "GET",
        token: true,
      });
    },
  });
};