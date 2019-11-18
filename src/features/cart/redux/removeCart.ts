import { REMOVE_CART } from "./constants";
import { fromJS } from "immutable";

export function removeCart() {
  return {
    type: REMOVE_CART
  };
}

export function reducer(state: any, action: any) {
  switch (action.type) {
    case REMOVE_CART:
      localStorage.removeItem("shoppingCardItems");
      localStorage.removeItem("totalPrice");
      return state.merge({
        shoppingCardItems: fromJS([])
      });

    default:
      return state;
  }
}
