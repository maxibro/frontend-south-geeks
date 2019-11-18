import { ADD_TO_CART } from "./constants";
import { IBook } from "../../../models";
import { fromJS } from "immutable";

export function addToCart(data: IBook) {
  return {
    type: ADD_TO_CART,
    data: data
  };
}

export function reducer(state: any, action: any) {
  switch (action.type) {
    case ADD_TO_CART:
      // retrieve elements from local storage:
      const jsonShoppingCardItems = localStorage.getItem("shoppingCardItems");
      const shoppingCardItems: any =
        jsonShoppingCardItems !== null ? JSON.parse(jsonShoppingCardItems) : [];

      let totalPrice: number = Number.isNaN(
        Number(localStorage.getItem("totalPrice"))
      )
        ? 0
        : Number(localStorage.getItem("totalPrice"));

      const updatedShoppingCardItems = [...shoppingCardItems, action.data];
      totalPrice += Number(action.data.price);

      localStorage.setItem(
        "shoppingCardItems",
        JSON.stringify(updatedShoppingCardItems)
      );
      localStorage.setItem("totalPrice", totalPrice.toString());
      return state.merge({
        shoppingCardItems: fromJS(updatedShoppingCardItems),
        totalPrice: totalPrice
      });

    default:
      return state;
  }
}
