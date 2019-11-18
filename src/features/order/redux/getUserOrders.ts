import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { config } from "../../../common/config";
import {
  ORDER_GET_BY_USER_BEGIN,
  ORDER_GET_BY_USER_SUCCESS,
  ORDER_GET_BY_USER_FAILURE,
  ORDER_GET_BY_USER_DISMISS_ERROR
} from "./constants";
import { IOrder, IPagination } from "../../../models";

const BACKEND_PROTO = config.BACKEND_PROTO;
const BACKEND_HOSTNAME = config.BACKEND_HOSTNAME;
const BACKEND_PORT = config.BACKEND_PORT;

export interface IGetUserOrdersActionData {
  userId: number;
}

export function getUserOrders(args: IGetUserOrdersActionData) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ORDER_GET_BY_USER_BEGIN
    });
    const { userId } = args;
    const promise = new Promise((resolve, reject) => {
      const url: RequestInfo = `${BACKEND_PROTO}://${BACKEND_HOSTNAME}:${BACKEND_PORT}/user-orders`;
      axios
        .get(url, {
          params: { id: userId }
        })
        .then(
          (res: AxiosResponse<IPagination<IOrder>>) => {
            dispatch({
              type: ORDER_GET_BY_USER_SUCCESS,
              data: res.data
            });
            resolve(res);
          },
          (err: AxiosError) => {
            dispatch({
              type: ORDER_GET_BY_USER_FAILURE,
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
export function dismissGetUserOrdersError() {
  return {
    type: ORDER_GET_BY_USER_DISMISS_ERROR
  };
}

export function reducer(state: any, action: any) {
  switch (action.type) {
    case ORDER_GET_BY_USER_BEGIN:
      // Just after a request is sent
      return state.merge({
        getAllPending: true,
        getAllError: null
      });

    case ORDER_GET_BY_USER_SUCCESS:
      // The request is success
      return state.merge({
        paginatedList: action.data,
        getAllPending: false,
        getAllError: null
      });

    case ORDER_GET_BY_USER_FAILURE:
      // The request is failed
      return state.merge({
        getAllPending: false,
        getAllError: action.data.error
      });

    case ORDER_GET_BY_USER_DISMISS_ERROR:
      // Dismiss the request failure error
      return state.merge({
        getAllError: null
      });

    default:
      return state;
  }
}
