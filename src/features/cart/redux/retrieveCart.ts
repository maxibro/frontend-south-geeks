import { RETRIEVE_CART } from "./constants";
import { fromJS } from "immutable";

export function retrieveCart() {
  return {
    type: RETRIEVE_CART
  };
}

export function reducer(state: any, action: any) {
  switch (action.type) {
    case RETRIEVE_CART:
      const jsonShoppingCardItems = localStorage.getItem("shoppingCardItems");

      const shoppingCardItems: any =
        jsonShoppingCardItems !== null ? JSON.parse(jsonShoppingCardItems) : [];

      const totalPrice: number = Number.isNaN(
        Number(localStorage.getItem("totalPrice"))
      )
        ? 0
        : Number(localStorage.getItem("totalPrice"));

      return state.merge({
        shoppingCardItems: fromJS(shoppingCardItems),
        totalPrice: totalPrice
      });

    default:
      return state;
  }
}
