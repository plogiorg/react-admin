import { AuthContextState, AuthReducerActions } from "./types";

const AuthReducer = (
  state: AuthContextState,
  action: AuthReducerActions
): AuthContextState => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        isLoggedIn: false,
        user: null,
        isLoading: false,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};

export default AuthReducer;
