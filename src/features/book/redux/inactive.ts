import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { config } from "../../../common/config";
import {
  BOOK_INACTIVE_BEGIN,
  BOOK_INACTIVE_SUCCESS,
  BOOK_INACTIVE_FAILURE,
  BOOK_INACTIVE_DISMISS_ERROR
} from "./constants";
import { IBook } from "./../../../models";
const BACKEND_PROTO = config.BACKEND_PROTO;
const BACKEND_HOSTNAME = config.BACKEND_HOSTNAME;
const BACKEND_PORT = config.BACKEND_PORT;

export interface IInactiveActionData {
  id: number;
}

export function inactive(args: IInactiveActionData) {
  return (dispatch: Dispatch) => {
    // optionally you can have getState as the second argument
    dispatch({
      type: BOOK_INACTIVE_BEGIN
    });
    const promise = new Promise((resolve, reject) => {
      const id = args.id;
      const url: RequestInfo = `${BACKEND_PROTO}://${BACKEND_HOSTNAME}:${BACKEND_PORT}/inactive-book/${id}`;

      axios.put(url, args).then(
        (res: AxiosResponse<IBook>) => {
          dispatch({
            type: BOOK_INACTIVE_SUCCESS,
            data: res.data
          });
          resolve(res);
        },
        (err: AxiosError) => {
          dispatch({
            type: BOOK_INACTIVE_FAILURE,
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
export function dismissInactiveError() {
  return {
    type: BOOK_INACTIVE_DISMISS_ERROR
  };
}

export function reducer(state: any, action: any) {
  switch (action.type) {
    case BOOK_INACTIVE_BEGIN:
      // Just after a request is sent
      return state.merge({
        inactivePending: true,
        inactiveError: null
      });

    case BOOK_INACTIVE_SUCCESS:
      return state.merge({
        inactivePending: false,
        inactiveError: null
      });

    case BOOK_INACTIVE_FAILURE:
      // The request is failed
      return state.merge({
        inactivePending: false,
        inactiveError: action.data.error
      });

    case BOOK_INACTIVE_DISMISS_ERROR:
      // Dismiss the request failure error
      return state.merge({
        inactiveError: null
      });

    default:
      return state;
  }
}
