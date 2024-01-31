import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { AuthContextType } from "./types";
import AuthReducer from "./reducer";
import { LoginResponse, useCurrentUser } from "../../api";
import { GlobalLoader } from "../../components";

const AuthContextInitialValues: AuthContextType = {
  isLoading: true,
  token: null,
  isLoggedIn: false,
  user: null,
  login: (data?:LoginResponse) => {console.log(data);},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(AuthContextInitialValues);

type Props = { children: ReactNode };

export const AuthContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, AuthContextInitialValues);

  const { refetch: getCurrentUser } = useCurrentUser();

  useEffect(() => {
    const initAuth = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: { isLoading: true } });
        const { data: userResponse } = await getCurrentUser()
        if (userResponse?.sub) {
          dispatch({
            type: "SET_USER",
            payload: {
              user: userResponse,
            },
          });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      } catch (err) {
        console.log("Error authenticating: ", err);
        dispatch({ type: "LOGOUT" });
      }
    };

    initAuth();
  }, []);

  const login = useCallback((data:object) => {
    dispatch({ type: "SET_LOADING", payload: { isLoading: true } });
    dispatch({
      type: "SET_USER",
      payload: {
        user: data,
      },
    });
  }, [dispatch]);

  const logout = useCallback(() => {
    // dispatch({ type: "SET_LOADING", payload: { isLoading: true } });
    // window.location.href = generateAPIUrl("/v1/auth/logout", {
    //   homeUrl: `${getHostUrl()}/`,
    // });
  }, [dispatch]);

  const actions = useMemo(() => ({ login, logout }), [login, logout]);

  const contextValue = useMemo(
    () => ({ ...state, ...actions }),
    [state, actions]
  );

  console.log({ state, contextValue });

  return (
    <AuthContext.Provider value={contextValue}>
      {state.isLoading ? <GlobalLoader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
