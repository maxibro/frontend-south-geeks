import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { config } from "./../../../common/config";
import {
  BOOK_GET_BEGIN,
  BOOK_GET_SUCCESS,
  BOOK_GET_FAILURE,
  BOOK_GET_DISMISS_ERROR
} from "./constants";

import { IBook } from "./../../../models";
const BACKEND_PROTO = config.BACKEND_PROTO;
const BACKEND_HOSTNAME = config.BACKEND_HOSTNAME;
const BACKEND_PORT = config.BACKEND_PORT;

export interface IGetActionData {
  data: any;
}

export const get = (args: IGetActionData) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: BOOK_GET_BEGIN
    });

    const promise = new Promise((resolve, reject) => {
      const { data } = args;
      const url: RequestInfo = `${BACKEND_PROTO}://${BACKEND_HOSTNAME}:${BACKEND_PORT}/book/${data.id}`;
      axios.get(url).then(
        (res: AxiosResponse<IBook>) => {
          dispatch({
            type: BOOK_GET_SUCCESS,
            data: res.data
          });
          resolve(res);
        },
        (err: AxiosError) => {
          dispatch({
            type: BOOK_GET_FAILURE,
            data: { error: err }
          });
          reject(err);
        }
      );
    });

    return promise;
  };
};

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetError() {
  return {
    type: BOOK_GET_DISMISS_ERROR
  };
}

export function reducer(state: any, action: any) {
  switch (action.type) {
    case BOOK_GET_BEGIN:
      // Just after a request is sent
      return state.merge({
        getPending: true,
        getError: null
      });

    case BOOK_GET_SUCCESS:
      // The request is success
      return state.merge({
        item: action.data,
        getPending: false,
        getError: null
      });

    case BOOK_GET_FAILURE:
      // The request is failed
      return state.merge({
        getPending: false,
        getError: action.data.error
      });

    case BOOK_GET_DISMISS_ERROR:
      // Dismiss the request failure error
      return state.merge({
        getError: null
      });

    default:
      return state;
  }
}
