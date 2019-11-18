import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { config } from "../../../common/config";
import {
  BOOK_CREATE_BEGIN,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAILURE,
  BOOK_CREATE_DISMISS_ERROR
} from "./constants";
import { IBook } from "../../../models";

const BACKEND_PROTO = config.BACKEND_PROTO;
const BACKEND_HOSTNAME = config.BACKEND_HOSTNAME;
const BACKEND_PORT = config.BACKEND_PORT;

export interface ICreateActionData {
  data: any;
}
export function create(args: ICreateActionData) {
  return (dispatch: Dispatch) => {
    // optionally you can have getState as the second argument
    dispatch({
      type: BOOK_CREATE_BEGIN
    });

    const formData = new FormData();

    const { name, author, price, txtFile } = args.data;
    // Fill the formData object
    formData.append("name", name);
    formData.append("author", author);
    formData.append("price", price);
    formData.append("txt_file", txtFile);

    const promise = new Promise((resolve, reject) => {
      const url: RequestInfo = `${BACKEND_PROTO}://${BACKEND_HOSTNAME}:${BACKEND_PORT}/book`;

      axios.post(url, formData).then(
        (res: AxiosResponse<IBook>) => {
          dispatch({
            type: BOOK_CREATE_SUCCESS,
            data: res.data
          });
          resolve(res);
        },
        (err: AxiosError) => {
          dispatch({
            type: BOOK_CREATE_FAILURE,
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
export function dismissCreateError() {
  return {
    type: BOOK_CREATE_DISMISS_ERROR
  };
}

export function reducer(state: any, action: any) {
  switch (action.type) {
    case BOOK_CREATE_BEGIN:
      // Just after a request is sent
      return state.merge({
        createPending: true,
        createError: null
      });

    case BOOK_CREATE_SUCCESS:
      // The request is success
      return state.merge({
        createPending: false,
        createError: null
      });

    case BOOK_CREATE_FAILURE:
      // The request is failed
      return state.merge({
        createPending: false,
        createError: action.data.error
      });

    case BOOK_CREATE_DISMISS_ERROR:
      // Dismiss the request failure error
      return state.merge({
        createError: null
      });

    default:
      return state;
  }
}
