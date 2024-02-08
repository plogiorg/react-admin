import { useMutation } from "react-query";
import { LoginRequest, ServiceType } from ".";
import { fetchUtil } from "../utils/fetch.util";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => {
      return fetchUtil({
        url: "/v1/auth/login",
        body: data,
        method: "POST",
      });
    },
  });
};

export const useLogout = () => {
  return useMutation({
    onMutate: () => {
      return fetchUtil({
        url: "/v1/auth/logout",
        method: "POST",
      });
    },
  });
};

export const useCreateServiceType = () => {
  return useMutation({
    mutationFn: (data: ServiceType) => {
      return fetchUtil({
        url: "/v1/service/types",
        method: "POST",
        body: data,
        token: true
      });
    },
  });
};

export const useUpdateServiceType = () => {
  return useMutation({
    mutationFn: (data: ServiceType) => {
      return fetchUtil({
        url: `/v1/service/types/${data.id}`,
        method: "PUT",
        body: data,
        token: true
      });
    },
  });
};
