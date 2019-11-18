import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { config } from "../../../common/config";
import {
  ORDER_CREATE_BEGIN,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_DISMISS_ERROR
} from "./constants";
import { IOrder, IBook } from "../../../models";

const BACKEND_PROTO = config.BACKEND_PROTO;
const BACKEND_HOSTNAME = config.BACKEND_HOSTNAME;
const BACKEND_PORT = config.BACKEND_PORT;

export interface ICreateActionData {
  books: IBook[];
  amount: number;
}

export function confirmOrder() {
  return (dispatch: Dispatch) => {
    // optionally you can have getState as the second argument
    dispatch({
      type: ORDER_CREATE_BEGIN
    });

    const jsonShoppingCardItems = localStorage.getItem("shoppingCardItems");

    const shoppingCardItems: any =
      jsonShoppingCardItems !== null ? JSON.parse(jsonShoppingCardItems) : [];

    const totalPrice: number = Number.isNaN(
      Number(localStorage.getItem("totalPrice"))
    )
      ? 0
      : Number(localStorage.getItem("totalPrice"));

    const createOrderData: ICreateActionData = {
      books: shoppingCardItems,
      amount: totalPrice
    };

    const promise = new Promise((resolve, reject) => {
      const url: RequestInfo = `${BACKEND_PROTO}://${BACKEND_HOSTNAME}:${BACKEND_PORT}/order`;

      axios.post(url, createOrderData).then(
        (res: AxiosResponse<IOrder>) => {
          dispatch({
            type: ORDER_CREATE_SUCCESS,
            data: res.data
          });
          resolve(res);
        },
        (err: AxiosError) => {
          dispatch({
            type: ORDER_CREATE_FAILURE,
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
export function dismissConfirmOrderError() {
  return {
    type: ORDER_CREATE_DISMISS_ERROR
  };
}

export function reducer(state: any, action: any) {
  switch (action.type) {
    case ORDER_CREATE_BEGIN:
      // Just after a request is sent
      return state.merge({
        createPending: true,
        createError: null
      });

    case ORDER_CREATE_SUCCESS:
      // The request is success
      localStorage.removeItem("shoppingCardItems");
      localStorage.removeItem("totalPrice");

      return state.merge({
        createPending: false,
        createError: null
      });

    case ORDER_CREATE_FAILURE:
      // The request is failed
      return state.merge({
        createPending: false,
        createError: action.data.error
      });

    case ORDER_CREATE_DISMISS_ERROR:
      // Dismiss the request failure error
      return state.merge({
        createError: null
      });

    default:
      return state;
  }
}
