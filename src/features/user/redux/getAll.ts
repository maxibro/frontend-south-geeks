import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { config } from "../../../common/config";
import {
  USER_GET_ALL_BEGIN,
  USER_GET_ALL_SUCCESS,
  USER_GET_ALL_FAILURE,
  USER_GET_ALL_DISMISS_ERROR
} from "./constants";
import { IUser, IPagination } from "../../../models";

const BACKEND_PROTO = config.BACKEND_PROTO;
const BACKEND_HOSTNAME = config.BACKEND_HOSTNAME;
const BACKEND_PORT = config.BACKEND_PORT;

export interface IGetAllActionData {
  page: any;
}

export function getAll(args: IGetAllActionData) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: USER_GET_ALL_BEGIN
    });
    const { page } = args;
    const promise = new Promise((resolve, reject) => {
      const url: RequestInfo = `${BACKEND_PROTO}://${BACKEND_HOSTNAME}:${BACKEND_PORT}/users`;
      axios
        .get(url, {
          params: { page: page }
        })
        .then(
          (res: AxiosResponse<IPagination<IUser>>) => {
            dispatch({
              type: USER_GET_ALL_SUCCESS,
              data: res.data
            });
            resolve(res);
          },
          (err: AxiosError) => {
            dispatch({
              type: USER_GET_ALL_FAILURE,
              data: { error: err }
            });
            reject(err);
          }
        );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetAllError() {
  return {
    type: USER_GET_ALL_DISMISS_ERROR
  };
}

export function reducer(state: any, action: any) {
  switch (action.type) {
    case USER_GET_ALL_BEGIN:
      // Just after a request is sent
      return state.merge({
        getAllPending: true,
        getAllError: null
      });

    case USER_GET_ALL_SUCCESS:
      // The request is success
      return state.merge({
        paginatedList: action.data,
        getAllPending: false,
        getAllError: null
      });

    case USER_GET_ALL_FAILURE:
      // The request is failed
      return state.merge({
        getAllPending: false,
        getAllError: action.data.error
      });

    case USER_GET_ALL_DISMISS_ERROR:
      // Dismiss the request failure error
      return state.merge({
        getAllError: null
      });

    default:
      return state;
  }
}
