import PropTypes from 'prop-types';
import { useEffect, useReducer, useCallback, useMemo } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt_decode from 'jwt-decode';
// utils
import axios from 'src/utils/axios';
//
import { localStorageAvailable } from 'src/utils/storage-available';
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem(STORAGE_KEY) : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        // const response = await axios.get(endpoints.auth.me);

        // const { user } = response.data;

        const user = jwt_decode(accessToken);

        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (phone, password) => {
    const data = {
      phone,
      password,
    };

    // const response = await axios.post(endpoints.auth.login, data);
    // const { accessToken, user } = response.data;
    // setSession(accessToken);

    // const mainUrl = process.env.REACT_APP_API_BASEURL;
    // const mainUrl = 'https://midge-firm-drake.ngrok-free.app/';

    // console.log(mainUrl);

    const response = await axios.post(`${process.env.REACT_APP_API_BASEURL}api/Login`, data, {
      headers: { XApiKey: `TPJDtRG0cP` },
    });
    const accessToken = response.data.data;
    // console.log('accessToken login :', accessToken);
    const user = jwt_decode(accessToken);
    // console.log(user)
    setSession(accessToken);

    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
    }),
    [login, logout, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

// {
//   "status_code": 200,
//   "status_description": "succes",
//   "token": {
//       "access_token": "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjY1MjM2NCIsIlVzZXJuYW1lIjoicGlua0BiaWxldGluaWFsLmNvbSIsIkNpbmVtYUlkIjoiOSIsIlNpdGVJZCI6IjAiLCJuYmYiOjE2OTM0ODk4NDcsImV4cCI6MTY5MzU3NjI0NywiaXNzIjoiaHR0cDovL2NvbnRlbnRhcGktZGV2LmJpbGV0aW5pYWwuY29tL3N3YWdnZXIvaW5kZXguaHRtbCIsImF1ZCI6Imh0dHA6Ly9jb250ZW50YXBpLWRldi5iaWxldGluaWFsLmNvbS9zd2FnZ2VyL2luZGV4Lmh0bWwifQ.Dw8X1rLU3ooJ5Fv0wVCwQjPexU-uWh8fK59iQdI2xAShULdNj06VDyRzUUFnbiSeUraY95nIJdY8byKVUBBgSQ",
//       "token_type": "bearer",
//       "nbf": "2023-08-31T13:50:47Z",
//       "exp": "2023-09-01T13:50:47Z"
//   }
// }
