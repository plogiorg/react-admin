import { LoginResponse } from "../../api";

export type AuthContextState = {
  isLoading: boolean;
  token: string | null;
  isLoggedIn: boolean;
  user: Record<string, object> | null;
};

export type AuthContextActions = {
  login: (data:LoginResponse) => void;
  logout: () => void;
};

export type AuthContextType = AuthContextState & AuthContextActions;

export type SetLoadingReducerAction = {
  type: "SET_LOADING";
  payload: {
    isLoading: boolean;
  };
};

export type LogoutReducerAction = {
  type: "LOGOUT";
};

export type SetUserReducerAction = {
  type: "SET_USER";
  payload: {
    user: Record<string, any>;
    dpId?: string;
  };
};

export type AuthReducerActions =
  | SetLoadingReducerAction
  | LogoutReducerAction
  | SetUserReducerAction;
