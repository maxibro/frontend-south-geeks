import axios from "axios";
import { Dispatch } from "redux";
import { config } from "./../../../common/config";
import {
  AUTH_SIGN_IN_BEGIN,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAILURE,
  AUTH_SIGN_IN_DISMISS_ERROR
} from "./constants";

const BACKEND_PROTO = config.BACKEND_PROTO;
const BACKEND_HOSTNAME = config.BACKEND_HOSTNAME;
const BACKEND_PORT = config.BACKEND_PORT;
interface IActionData {
  data: any;
}

const signIn = (args: IActionData) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: AUTH_SIGN_IN_BEGIN
    });

    const promise = new Promise((resolve, reject) => {
      const { data } = args;
      const url: RequestInfo = `${BACKEND_PROTO}://${BACKEND_HOSTNAME}:${BACKEND_PORT}/sign-in`;

      axios.post(url, data).then(
        res => {
          dispatch({
            type: AUTH_SIGN_IN_SUCCESS,
            data: res.data
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: AUTH_SIGN_IN_FAILURE,
            data: { error: err }
          });
          reject(err);
        }
      );
    });

    return promise;
  };
};

export function dismissSignInError() {
  return {
    type: AUTH_SIGN_IN_SUCCESS
  };
}

export function reducer(state: any, action: any) {
  switch (action.type) {
    case AUTH_SIGN_IN_BEGIN:
      return state.merge({
        signInPending: true,
        signInError: null
      });

    case AUTH_SIGN_IN_SUCCESS:
      const key = "Authorization";
      axios.defaults.headers.common[key] = `Bearer ${action.data.token}`;
      localStorage.setItem("token", action.data.token);
      localStorage.setItem("role", action.data.role);
      return state.merge({
        token: action.data.token,
        role: action.data.role,
        signInPending: false,
        signInError: null
      });

    case AUTH_SIGN_IN_FAILURE:
      return state.merge({
        signInPending: false,
        signInError: action.data.error
      });

    case AUTH_SIGN_IN_DISMISS_ERROR:
      return state.merge({
        signInError: null
      });

    default:
      return state;
  }
}

export { signIn };
