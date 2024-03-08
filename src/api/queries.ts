import { useQuery } from "react-query";
import { fetchUtil } from "../utils/fetch.util";
import { GetServiceTypesResponse, GetUsersResponse } from "./models.ts";

const QUERY_KEYS = {
  GET_CURRENT_USER: ["user"],
  GET_USERS: ["users"],
  GET_SERVICES: ["services"],
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_CURRENT_USER,
    enabled: false,
    retry: false,
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

export const useGetServices = () => {
  return useQuery<GetServiceTypesResponse>({
    queryKey: QUERY_KEYS.GET_USERS,
    queryFn: () => {
      return fetchUtil({
        url: "/v1/service/types",
        method: "GET",
        token: true,
      });
    },
  });
};