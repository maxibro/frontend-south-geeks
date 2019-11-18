import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { config } from "./../../../common/config";
import {
  BOOK_GET_ALL_BEGIN,
  BOOK_GET_ALL_SUCCESS,
  BOOK_GET_ALL_FAILURE,
  BOOK_GET_ALL_DISMISS_ERROR
} from "./constants";
import { IBook, IPagination } from "../../../models";

const BACKEND_PROTO = config.BACKEND_PROTO;
const BACKEND_HOSTNAME = config.BACKEND_HOSTNAME;
const BACKEND_PORT = config.BACKEND_PORT;

export interface IGetAllActionData {
  page: any;
  searchString: string;
}

export function getAll(args: IGetAllActionData) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: BOOK_GET_ALL_BEGIN
    });
    const { page, searchString } = args;

    const promise = new Promise((resolve, reject) => {
      const url: RequestInfo = `${BACKEND_PROTO}://${BACKEND_HOSTNAME}:${BACKEND_PORT}/books`;
      axios
        .get(url, {
          params: { page: page, search: searchString }
        })
        .then(
          (res: AxiosResponse<IPagination<IBook>>) => {
            dispatch({
              type: BOOK_GET_ALL_SUCCESS,
              data: res.data,
              searchString: searchString
            });
            resolve(res);
          },
          (err: AxiosError) => {
            dispatch({
              type: BOOK_GET_ALL_FAILURE,
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
    type: BOOK_GET_ALL_DISMISS_ERROR
  };
}

export function reducer(state: any, action: any) {
  switch (action.type) {
    case BOOK_GET_ALL_BEGIN:
      // Just after a request is sent
      return state.merge({
        getAllPending: true,
        getAllError: null
      });

    case BOOK_GET_ALL_SUCCESS:
      // The request is success

      return state.merge({
        paginatedList: action.data,
        searchString: action.searchString,
        getAllPending: false,
        getAllError: null
      });

    case BOOK_GET_ALL_FAILURE:
      // The request is failed
      return state.merge({
        getAllPending: false,
        getAllError: action.data.error
      });

    case BOOK_GET_ALL_DISMISS_ERROR:
      // Dismiss the request failure error
      return state.merge({
        getAllError: null
      });

    default:
      return state;
  }
}
